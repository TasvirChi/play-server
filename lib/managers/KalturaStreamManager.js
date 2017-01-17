
var fs = require('fs');
var os = require('os');
var url = require('url');
var util = require('util');
var http = require('follow-redirects').http;

var id3Reader = require('../../bin/Release/TsId3Reader.node');

var borhan = module.exports = require('../BorhanManager');
borhan.mediaInfo = require('../media/BorhanMediaInfo');
borhan.ffmpegParams = require('../media/BorhanFfmpegParams');


/**
 * Stream watcher, instantiated per rendition manifest
 * 
 * @param manager BorhanStreamManager
 * @param params {url, entryId, masterUrl}
 * @param finishCallback called when watching is not required anymore
 */
var BorhanStreamWatcher = function(manager, params, finishCallback){
	BorhanLogger.log('init stream watcher for entry [' + params.entryId +']');
	this.manager = manager;
	this.finishCallback = finishCallback;

	this.renditionId = BorhanCache.getManifestId(params.url);
	this.trackerOutputKeyWithAds = BorhanCache.getManifestContent(this.renditionId);
	this.entryRequiredKey = BorhanCache.getEntryRequired(params.entryId);
	this.cuePointsKey = BorhanCache.getCuePoints(params.entryId);
	this.elapsedTimeKey = BorhanCache.getElapsedTime(params.entryId);
	this.oldestSegmentTimeKey = BorhanCache.getOldestSegmentTime(params.entryId);
	this.elapsedTime = {};
	this.cuePoints = {};
	this.segmentsHistoryLimit = BorhanConfig.config.cloud.segmentsHistoryLimit;
	this.segmentsHistory = {};
	this.urlTranslations = {};

	this.firstTime = true;
	this.startTime = new Date().getTime();
	this.trackerRequired = false;

	this.renditionManifestHandledKey = BorhanCache.getRenditionManifestHandled(params.url);
	
	this.url = params.url;
	this.lowestBitrate = params.lowestBitrate;
	this.entryId = params.entryId;
	this.partnerId = params.partnerId;
	this.masterUrl = params.masterUrl;
	this.firstManifestSegment = 0;
	
	var This = this;
	// if the process crashed and restored, the cache key might exist although no one is watching this manifest
	if(params.restored){
		this.getManifest();
	}
	else{
		BorhanCache.get(this.renditionManifestHandledKey, function(data){
			if(!data){
				This.getManifest();
			}
		});
	}
};

BorhanStreamWatcher.MINIMUM_RUN_PERIOD = 60000;
BorhanStreamWatcher.CYCLE_INTERVAL = 2000;
	
BorhanStreamWatcher.prototype = {

	/**
	 * @type BorhanStreamManager
	 */
	manager: null,
	
	/**
	 * @type function
	 */
	finishCallback: null,

	/**
	 * Check cache to see if entry still required
	 */
	verifyTrackingRequired: function(){
		var This = this;
		BorhanCache.get(this.entryRequiredKey, function(data){
			if(data){
				BorhanLogger.debug('Entry [' + This.entryId + '] still required [' + This.entryRequiredKey + ']');
				This.trackerRequired = true;
				var encodingIds = data.split('\n').unique();
				for(var i = 0; i < encodingIds.length; i++){ 
					if(encodingIds[i].trim().length){
						var encodingParamsKey = BorhanCache.getEncodingParams(encodingIds[i]);
						var mediaInfoKey = BorhanCache.getMediaInfo(encodingIds[i]);
						var blackEncodingParamsKey = BorhanCache.getBlackEncodingParams(encodingIds[i]);
						BorhanCache.touch(mediaInfoKey, BorhanConfig.config.cache.encodingParams);
						BorhanCache.touch(encodingParamsKey, BorhanConfig.config.cache.encodingParams);
						BorhanCache.touch(blackEncodingParamsKey, BorhanConfig.config.cache.blackMedia);
					}
				}				
			}
			else{
				BorhanLogger.log('Entry [' + This.entryId + '] not required any more [' + This.entryRequiredKey + ']');
				This.trackerRequired = false;
			}
		});
	},
	
	/**
	 * Load cue-points from cache
	 */
	loadCuePoints: function(callback){
		var This = this;
		BorhanCache.get(this.cuePointsKey, function(data){
			if(data){
				This.cuePoints = data;				
			}
			if(callback){
				callback();
			}
		}, function(err){
			if(callback){
				callback();
			}
		});
	},
	
	applyElapsedTimeToSegments: function(){
		if(this.elapsedTime && this.segmentsHistory[this.elapsedTime.sequence]){
			BorhanLogger.debug('Applying elapsed time to segments history for entry [' + this.entryId + '] rendition [' + this.renditionId + ']');
			var timestamp;
			var offset;
			
			timestamp = this.elapsedTime.timestamp;
			offset = this.elapsedTime.offset;
			for (var i = this.elapsedTime.sequence; this.segmentsHistory[i]; i--){
				this.segmentsHistory[i].timestamp = timestamp;
				this.segmentsHistory[i].offset = offset;
				if(this.segmentsHistory[i-1]){
					timestamp -= this.segmentsHistory[i-1].duration;
					offset -= this.segmentsHistory[i-1].duration;
				}
				else{
					BorhanLogger.debug('Segment history for index [' + (i-1) + '] is not defined setting offset/timestamp from current duration values');
					timestamp -= this.segmentsHistory[i].duration;
					offset -= this.segmentsHistory[i].duration;	
				}
			}

			timestamp = this.elapsedTime.timestamp;
			offset = this.elapsedTime.offset;
			for (var i = this.elapsedTime.sequence; this.segmentsHistory[i]; i++){
				this.segmentsHistory[i].timestamp = timestamp;
				this.segmentsHistory[i].offset = offset;
				timestamp += this.segmentsHistory[i].duration;
				offset += this.segmentsHistory[i].duration;				
			}
		}
		
		BorhanLogger.debug('Segments history ' + JSON.stringify(this.segmentsHistory));
	},
	
	/**
	 * Read the segments URLs, replace them with ads if needed, store the manifest to cache
	 * @param manifestContent
	 */
	stitchManifest: function(manifestContent){
		var This = this;
		BorhanLogger.log('[' + This.uniqueLoopId + '] stitchManifest: lowest bitrate = ' + this.lowestBitrate + ' for entry [' + this.entryId + '] and rendition [' + this.renditionId + ']');
		this.cycleStartTime = new Date().getTime();

		this.verifyTrackingRequired();

		var oldestSegment = null;
		var durationFromOldestSegment = 0;
		var latency = 0;
		var manifest = this.parseM3U8(manifestContent);
		
		var currentFirstSegment = parseInt(manifest.headers['EXT-X-MEDIA-SEQUENCE']);
		BorhanLogger.debug('[' + This.uniqueLoopId + '] Last stitched firstManifestSegment: ' + this.firstManifestSegment + ' current first manifest segment: ' + currentFirstSegment);
		if(currentFirstSegment < this.firstManifestSegment && ((this.firstManifestSegment - currentFirstSegment) < manifest.segments.length)){
			BorhanLogger.log('[' + This.uniqueLoopId + '] Skipping stitch manifest for entry [' + this.entryId + '] and rendition [' + this.renditionId + ']');
			BorhanCache.touch(This.trackerOutputKeyWithAds, BorhanConfig.config.cache.renditionManifest);
			this.keepWatching();
			return null;
		}
		else{
			this.firstManifestSegment = currentFirstSegment;
			if(this.adStartSegment && this.inAdSlot && (this.firstManifestSegment + manifest.segments.length < this.adStartSegment)){
				BorhanLogger.log('[' + this.uniqueLoopId + '] Re-setting inAdSlot for entry [' + this.entryId + '] and rendition [' + this.renditionId + '], firstManifestSegment [' + this.firstManifestSegment + '] adStartSegment [' + this.adStartSegment + ']');
				this.inAdSlot = false;
			}
		}
		
		if(manifest.segments.length > 0){
			var lastSegmentSequence = null;
			var startSegment = manifest.segments.length - this.segmentsHistoryLimit > 0 ? manifest.segments.length - this.segmentsHistoryLimit : 0;
			//set the oldest segment time in cache, cue points older than the oldest segment will
			//be deleted from cache
			oldestSegment = manifest.segments[0];
			for(var i = startSegment; i < manifest.segments.length; i++){
				if(this.firstTime || this.lowestBitrate){
					this.parseSegment(This.entryId, manifest.segments[i], manifest.segments.length);
				}
				lastSegmentSequence = manifest.segments[i].sequence;
				durationFromOldestSegment += manifest.segments[i].duration;
				
				//Calculate the latency based on the segments duration
				if(Math.ceil((durationFromOldestSegment/1000).toFixed(3)) < BorhanConfig.config.stream.latency)
					latency++;
				
				if(!this.segmentsHistory[lastSegmentSequence]){
					this.segmentsHistory[lastSegmentSequence] = manifest.segments[i];
				}				
			}
			
			for(var sequence in this.segmentsHistory){
				if(sequence < (lastSegmentSequence - this.segmentsHistoryLimit)){
					delete this.segmentsHistory[sequence];
				}
			}
		} else {
			BorhanLogger.log('[' + This.uniqueLoopId + '] No segments found, skipping stitch manifest for entry [' + this.entryId + '] and rendition [' + this.renditionId + ']');
			this.keepWatching();
			return null;	
		}

		this.applyElapsedTimeToSegments();


		if(oldestSegment && this.elapsedTime){
			var oldestSegmentTime = {
				offset: this.elapsedTime.offset - durationFromOldestSegment,
				timestamp: this.elapsedTime.timestamp - durationFromOldestSegment
			};
			BorhanLogger.log('[' + this.uniqueLoopId + '] oldestSegmentTime for entry [' + this.entryId + '] and rendition [' + this.renditionId + '] [' + JSON.stringify(oldestSegmentTime) + ']');
			BorhanCache.set(this.oldestSegmentTimeKey, oldestSegmentTime, BorhanConfig.config.cache.elapsedTime);
		}

		
		// if encoding was not defined yet by parsing the first ts, no ads could be ingested yet
		if(!this.encodingId){
			this.keepWatching();
			return null;
		}
		this.stitchBlack();
		
		var newResult = [];
		var buffer = [];
		var segmentsCount = Math.min( manifest.segments.length - 1, manifest.segments.length + 1 - latency );
		
		for(var segmentUrl in this.urlTranslations){
			this.urlTranslations[segmentUrl].used = false;
		}
		
		var preSegmentStitchParams = {};
		var postSegmentStitchParams = {};
		
		for(var segmentIndex = 0; segmentIndex <= segmentsCount; segmentIndex++){
			var resolveUrlAndContinue = function(){
				if(!parseInt(BorhanConfig.config.stream.useCdn)){
					buffer[0].url = buffer[0].resolvedUrl;
				}
				BorhanLogger.debug('[' + This.uniqueLoopId + '] Append original segment [' + buffer[0].url + ']');
				newResult.push(buffer[0]);
			};
			
			BorhanLogger.debug('[' + This.uniqueLoopId + '] Segment [' + manifest.segments[segmentIndex].sequence + '] URL [' + manifest.segments[segmentIndex].url + ']');
			
			// hold a buffer of 3 segments
			buffer.push(manifest.segments[segmentIndex]);
			if(buffer.length < 3)
				continue;

			while(buffer.length > 3)
				buffer.shift();
			
			// load buffer
			var currentSegmentUrl = buffer[0].url;

			// check whether we already mapped this buffer
			if(this.urlTranslations[currentSegmentUrl]){
				BorhanLogger.debug('[' + This.uniqueLoopId + '] Translating from urlTranslations [' + currentSegmentUrl + '] to [' + this.urlTranslations[currentSegmentUrl].url + ']');
				this.urlTranslations[currentSegmentUrl].used = true;
				newResult.push(this.urlTranslations[currentSegmentUrl]);
				continue;
			}
			
			if(segmentIndex < startSegment){
				resolveUrlAndContinue();
				continue;
			}
			
			offsetStart = this.segmentsHistory[buffer[1].sequence] ? (this.segmentsHistory[buffer[1].sequence].offset ? this.segmentsHistory[buffer[1].sequence].offset : null) : null;
			offsetEnd = offsetStart ? offsetStart + buffer[1].duration : null;
			timestampStart = this.segmentsHistory[buffer[1].sequence] ? (this.segmentsHistory[buffer[1].sequence].timestamp ? this.segmentsHistory[buffer[1].sequence].timestamp : null) : null;
			timestampEnd = timestampStart ? timestampStart + buffer[1].duration : null;
			BorhanLogger.log('[' + This.uniqueLoopId + '] Stitch segment [' + buffer[1].sequence + '] URL [' + currentSegmentUrl + '] offset start [' + offsetStart + 
								'] offset end [' + offsetEnd + '] timestamp start [' + timestampStart + '] timestamp end [' + timestampEnd + ']  is inAdSlot [' + this.inAdSlot + ']');
			
			//TODO: temporary remove the optimization and add tracking to monitor if we were skipping ads because of it
			var missedAdStart = 1;
			if(!this.lastUsedSegment || buffer[0].sequence > this.lastUsedSegment || (this.lastUsedSegment - buffer[0].sequence) > manifest.segments.length){
				// update the last used segment
				this.lastUsedSegment = buffer[0].sequence;
				missedAdStart = 0;
			}

			// check whether we should start an ad
			if(!this.inAdSlot && ((offsetStart && offsetEnd) || (timestampStart && timestampEnd))){
				BorhanLogger.debug('[' + This.uniqueLoopId + '] Checking cue points ...');
				for(var cuePointId in this.cuePoints){
					cuePoint = this.cuePoints[cuePointId];
					BorhanLogger.log('[' + This.uniqueLoopId + '] Checking cue point for partner [' + this.partnerId + '] entry [' + this.entryId + '] cuePoint [' + cuePointId + '] startTime [' + cuePoint.startTime + '] triggeredAt [' + cuePoint.triggeredAt + ']');
					// ad starts in first segment
					if( (cuePoint.startTime && offsetStart <= cuePoint.startTime && cuePoint.startTime <= offsetEnd) ||
						(cuePoint.triggeredAt && timestampStart <= cuePoint.triggeredAt*1000 && cuePoint.triggeredAt*1000 <= timestampEnd)){
						this.inAdSlot = true;
						this.cuePoint = cuePoint;
						if(cuePoint.startTime)
							this.adStartOffset = (cuePoint.startTime - offsetStart + buffer[0].duration) * 90;
						else
							this.adStartOffset = (cuePoint.triggeredAt*1000 - timestampStart + buffer[0].duration) * 90;
						this.adEndOffset = this.adStartOffset + cuePoint.duration * 90; 
						this.adCurOffset = 0;
						this.adStartSegment = buffer[0].sequence;
							
						BorhanLogger.log('[' + This.uniqueLoopId + '] Ad started cue-point [' + cuePointId + '] rendition [' + this.renditionId + '] start [' + this.adStartOffset + '] end [' + this.adEndOffset + '] partner [' + this.partnerId + '] entry [' + this.entryId + ']');
						BorhanLogger.debug('[' + This.uniqueLoopId + '] adCurOffset: ' + this.adCurOffset + ' adStartSegment: ' + this.adStartSegment);
						if(missedAdStart){
							BorhanLogger.debug('[' + This.uniqueLoopId + '] Alert: potentially missed ad start, last used segment [' + this.lastUsedSegment + '] current sequence [' + buffer[0].sequence + ']');
						}
						break;
					}
				}
			}
			

			// not part of ad -> just output it
			if(!this.inAdSlot || buffer[0].sequence < this.adStartSegment){
				resolveUrlAndContinue();
				continue;
			}
					
			var curSegmentDuration = buffer[0].duration * 90;
			var nextSegmentDuration = buffer[1].duration * 90;
			
			if(this.adCurOffset == 0){
				// create pre ad ts
				var preSegmentId = BorhanCache.getPreSegmentId(this.cuePoint.id, this.renditionId);
				preSegmentStitchParams = {
						buffer: [buffer[0].resolvedUrl, buffer[1].resolvedUrl, buffer[2].resolvedUrl],
						segmentId: preSegmentId,
						offset: this.adStartOffset
				};
			}

			if(this.adCurOffset + curSegmentDuration <= this.adEndOffset && this.adCurOffset + curSegmentDuration + nextSegmentDuration > this.adEndOffset){
				// create post ad ts
				var postSegmentId = BorhanCache.getPostSegmentId(this.cuePoint.id, this.renditionId);
				postSegmentStitchParams = {
						buffer: [buffer[0].resolvedUrl, buffer[1].resolvedUrl, buffer[2].resolvedUrl],
						segmentId: postSegmentId,
						offset: this.adEndOffset - this.adCurOffset
				};
			}

			if(this.adCurOffset > this.adEndOffset){
				// last segment
				outputEnd = 0;
			}
			else{
				outputEnd = this.adCurOffset + curSegmentDuration;
			}

			if(!parseInt(BorhanConfig.config.stream.useCdn)){
				buffer[0].url = buffer[0].resolvedUrl;
			}
			var stitchSegmentParams = {
				entryId: this.entryId, 
				cuePointId: this.cuePoint.id, 
				renditionId: this.renditionId, 
				encodingId: this.encodingId,
				segmentIndex: buffer[0].sequence - this.adStartSegment,
				outputStart: this.adCurOffset,
				outputEnd: outputEnd,
				adStart: this.adStartOffset,
				originalUrl: buffer[0].url
			};
			
			var tokens = {sessionId: '@SESSION_ID@'};
			
			buffer[0].url = this.manager.getPlayServerUrl('media', 'segment', this.partnerId, tokens, stitchSegmentParams);
			BorhanLogger.debug('[' + This.uniqueLoopId + '] Translating [' + currentSegmentUrl + '] to [' + buffer[0].url + ']');
			this.urlTranslations[currentSegmentUrl] = buffer[0];
			this.urlTranslations[currentSegmentUrl].used = true;
			newResult.push(buffer[0]);

			if(this.adCurOffset > this.adEndOffset){
				this.inAdSlot = false;
				BorhanLogger.log('[' + This.uniqueLoopId + '] Ad finished cue-point[' + this.cuePoint.id + '] start[' + this.adStartOffset + '] end[' + this.adEndOffset + ']');
			}
			else{
				this.adCurOffset += curSegmentDuration;
				BorhanLogger.log('[' + This.uniqueLoopId + '] Cue-point [' + this.cuePoint.id + '] ad current offset [' + this.adCurOffset + ']');
			}
		}
		
		var newManifestContent = this.buildM3U8(manifest.headers, newResult, manifest.footers);
		
		for(var segmentUrl in this.urlTranslations){
			if(!this.urlTranslations[segmentUrl].used){
				BorhanLogger.debug('[' + This.uniqueLoopId + '] Deleting [' + segmentUrl + '] from translations');
				delete this.urlTranslations[segmentUrl];
			}
		}
		
		var stitchingSegmentsCount = 0;
		if(preSegmentStitchParams.segmentId){
			stitchingSegmentsCount++;
			BorhanLogger.debug('[' + This.uniqueLoopId + '] Stitching pre segment for segment id [' + preSegmentStitchParams.segmentId +'] stitchingSegmentsCount [' + stitchingSegmentsCount + ']' );
			this.stitchSegment(preSegmentStitchParams.buffer, preSegmentStitchParams.segmentId, preSegmentStitchParams.offset, 'left', function(data){
				stitchingSegmentsCount--;
				BorhanLogger.debug('[' + This.uniqueLoopId + '] Done stitching pre segment for segment id [' + preSegmentStitchParams.segmentId +'] stitchingSegmentsCount [' + stitchingSegmentsCount + ']' );
				if(newManifestContent && !stitchingSegmentsCount){
					BorhanLogger.log('[' + This.uniqueLoopId + '] Setting ads manifest content for entry [' + This.entryId + '] callback after stitch pre');
					BorhanCache.set(This.trackerOutputKeyWithAds, newManifestContent, BorhanConfig.config.cache.renditionManifest);		
					This.keepWatching();
				}	
			});
		}
		
		if(postSegmentStitchParams.segmentId){
			stitchingSegmentsCount++;
			BorhanLogger.debug('[' + This.uniqueLoopId + '] Stitching post segment for segment id [' + postSegmentStitchParams.segmentId +'] stitchingSegmentsCount [' + stitchingSegmentsCount + ']' );
			this.stitchSegment(postSegmentStitchParams.buffer, postSegmentStitchParams.segmentId, postSegmentStitchParams.offset, 'right', function(data){
				stitchingSegmentsCount--;
				BorhanLogger.debug('[' + This.uniqueLoopId + '] Done stitching post segment for segment id [' + postSegmentStitchParams.segmentId +'] stitchingSegmentsCount [' + stitchingSegmentsCount + ']' );
				if(newManifestContent && !stitchingSegmentsCount){
					BorhanLogger.log('[' + This.uniqueLoopId + '] Setting ads manifest content for entry [' + This.entryId + '] callback after stitch post');
					BorhanCache.set(This.trackerOutputKeyWithAds, newManifestContent, BorhanConfig.config.cache.renditionManifest);
					This.keepWatching();
				}	
			});
		}

		// build the final manifest		
		if(newManifestContent && !stitchingSegmentsCount){
			BorhanLogger.log('[' + This.uniqueLoopId + '] Setting ads manifest content for entry [' + This.entryId + ']');
			BorhanCache.set(This.trackerOutputKeyWithAds, newManifestContent, BorhanConfig.config.cache.renditionManifest);
			This.keepWatching();
		}					
	},
	
	
	/**
	 * Trigger black segment stitching
	 * 
	 * @param segments
	 * @param segmentId
	 * @param offset
	 * @param portion
	 */
	stitchBlack: function(){
		var This = this;
		var blackMediaKey = BorhanCache.getBlackMedia(this.encodingId);
		BorhanCache.touch(blackMediaKey, BorhanConfig.config.cache.blackMedia, function(){
			BorhanLogger.debug('Black media [' + This.encodingId + '] already stitched');
			var blackEncodingParamsKey = BorhanCache.getBlackEncodingParams(This.encodingId);
			BorhanCache.touch(blackEncodingParamsKey, BorhanConfig.config.cache.blackMedia);
		}, function(err){
			var blackHandledKey = BorhanCache.getBlackHandled(This.encodingId);
			BorhanCache.add(blackHandledKey, true, BorhanConfig.config.cache.blackHandled, function(){
				BorhanLogger.log('Stitching black media [' + This.encodingId + ']');
				This.manager.callPlayServerService('segment', 'stitchBlack', This.partnerId, {encodingId: This.encodingId});
			}, function (err) {
				BorhanLogger.debug('Black media [' + This.encodingId + '] already handled');
			});
		});
	},
	
	
	/**
	 * Trigger segment stitching
	 * 
	 * @param segments
	 * @param segmentId
	 * @param offset
	 * @param portion
	 */
	stitchSegment: function(segments, segmentId, offset, portion, callback){
		var segmentParams = {
			segmentId: segmentId,
			url1: segments[0],
			url2: segments[1],
			url3: segments[2],
			offset: offset, 
			portion: portion
		};
		this.manager.callPlayServerService('segment', 'stitch', this.partnerId, segmentParams, null, callback);
	},

	
	/**
	 * Trigger the next manifest watch, in few seconds
	 */
	keepWatching: function(){
		if(!this.manager.run){
			return;
		}
		
		// sleep until next cycle
		var curTime = new Date().getTime();
		var sleepTime = Math.max(0, this.cycleStartTime + BorhanStreamWatcher.CYCLE_INTERVAL - curTime);
		var This = this;
		setTimeout(function(){
			This.getManifest();
		}, sleepTime);
	},
	
	/**
	 * Fetch the manifest from the cdn and call the manifest handler
	 */
	getManifest: function(){
		this.uniqueLoopId = BorhanUtils.getUniqueId();
		BorhanLogger.log('[' + this.uniqueLoopId + '] getting manifest for [' + this.entryId + '] rendition [' + this.renditionId + ']');
		BorhanCache.set(this.renditionManifestHandledKey, true, BorhanConfig.config.cache.renditionManifest);
		
		//verify if entry is still required
		this.verifyTrackingRequired();

		if(new Date().getTime() > (this.startTime + BorhanStreamWatcher.MINIMUM_RUN_PERIOD) && !this.trackerRequired){
			BorhanCache.del(this.renditionManifestHandledKey);
			BorhanLogger.log('Done ' + this.entryId);
			if(this.finishCallback && typeof this.finishCallback === 'function'){
				this.finishCallback();
			}
			return;
		}

		var This = this;
		this.manager.getHttpUrl(this.url, null, function(manifestContent){
			BorhanLogger.log('[' + This.uniqueLoopId + '] Manifest fetched [' + This.entryId + '] [' + This.url + ']');
			
			This.loadCuePoints(function(){
				if(This.lowestBitrate){
					BorhanLogger.log('[' + This.uniqueLoopId + '] Stitch manifest [' + This.entryId + '] rendition [' + This.renditionId + '] elapsedTime [' + JSON.stringify(This.elapsedTime) + ']');
					This.stitchManifest(manifestContent);
				}
				else{
					BorhanCache.get(This.elapsedTimeKey, function(elapsedTime){
						This.elapsedTime = elapsedTime;
						BorhanLogger.log('[' + This.uniqueLoopId + '] Stitch manifest [' + This.entryId + '] rendition [' + This.renditionId + '] elapsedTime [' + JSON.stringify(This.elapsedTime) + ']');
						This.stitchManifest(manifestContent);						
					});
				}					
			});
		}, function(err){
			This.cycleStartTime = new Date().getTime();
			BorhanLogger.error('[' + This.uniqueLoopId + '] Failed to fetch manifest [' + This.url + ']: ' + err);
			This.keepWatching();
		});
	},

	/**
	 * @type int make sure we won't handle the same segment twice
	 */
	lastParsedSegment: 0,
	
	
	/**
	 * Fetch the segment from the cdn an parse its metadata
	 */
	parseSegment: function(entryId, segment, numberOfSegments){
		BorhanLogger.log('[' + this.uniqueLoopId + '] Parse segment entry [' + entryId + '] segment [' + segment.sequence + '] url [' + segment.resolvedUrl + ']');
		
		if(this.lastParsedSegment >= segment.sequence && (this.lastParsedSegment - segment.sequence) <= numberOfSegments){
			BorhanLogger.debug('[' + this.uniqueLoopId + '] Exit parse segment, lastParsedSegment: [' + this.lastParsedSegment +']');
			return;
		}
					
		this.lastParsedSegment = segment.sequence;

		parsedUrl = url.parse(segment.resolvedUrl);
		var options = {
			hostname : parsedUrl.hostname,
			port : parsedUrl.port,
			path : parsedUrl.path,
			method : 'GET',
		};

		var This = this;
		var request = http.request(options, function(response) {
			if (response.statusCode != 200) {
				BorhanLogger.error('[' + This.uniqueLoopId + '] Parse segment entry [' + entryId + '] segment [' + segment.sequence + '] url [' + segment.resolvedUrl + ']: Invalid http status: ' + response.statusCode);
				return;
			}

			var localPath = null;
			if(This.firstTime || BorhanLogger.largeDataDebugEnabled){				
				localPath = BorhanConfig.config.cloud.sharedBasePath + '/tmp/' + BorhanUtils.getUniqueId();
				BorhanLogger.log('[' + This.uniqueLoopId + '] Saving segment entry [' + entryId + '] segment [' + segment.sequence + ']  url [' + segment.resolvedUrl + '] in [' + localPath +']');
				var localFile = fs.createWriteStream(localPath);
				response.pipe(localFile);
			}
			
			var buffers = [];
			response.on('data', function(data) {
				buffers.push(data);
			});
			response.on('end', function() {

				if(This.firstTime){
					This.parseEncodingParams(localPath);

					This.firstTime = false;
				}
				
				if(This.lowestBitrate){
					This.parseCuePoints(This.entryId, segment, Buffer.concat(buffers));
				}
			});
		});

		request.on('error', function(e) {
			BorhanLogger.error('[' + This.uniqueLoopId + '] Parse segment entry [' + entryId + '] segment [' + segment.sequence + '] url [' + segment.resolvedUrl + ']: http error: ' + e.message);
		});

		request.end();
	},

	
	/**
	 * Select closest bitrate from know list of bitrates
	 * 
	 * @param bitrate
	 * @param standardBitrates
	 * @returns int
	 */
	normalizeBitrate: function(bitrate, standardBitrates){
		var normBitrate = standardBitrates[0];
		for(var i = 1; i < standardBitrates.length; i++){
			var curBitrate = standardBitrates[i];
			if(Math.abs(curBitrate - bitrate) < Math.abs(normBitrate - bitrate)){
				normBitrate = curBitrate;
			}
		}
		
		return normBitrate;
	},

	
	/**
	 * Select closest bitrate from know list of video bitrates
	 * 
	 * @param bitrate
	 * @returns int
	 */
	normalizeVideoBitrate: function(bitrate){
		return this.normalizeBitrate(bitrate, [300,400,500,700,900,1200,1600,2000,2500,3000,4000]);
	},


	/**
	 * Select closest bitrate from know list of audio bitrates
	 * 
	 * @param bitrate
	 * @returns int
	 */
	normalizeAudioBitrate: function(bitrate){
		return this.normalizeBitrate(bitrate, [64,128]);
	},

	/**
	 * Build encoding params based on the first segment
	 * @param localPath
	 */
	parseEncodingParams: function(localPath){
		var This = this;
		
		if(BorhanConfig.config.bin && BorhanConfig.config.bin.mediaInfoPath){
			borhan.mediaInfo.bin = BorhanConfig.config.bin.mediaInfoPath;
		}
		
		borhan.mediaInfo.parse(localPath, function(mediaInfo){

			encodingParams = borhan.ffmpegParams.buildEncodingParams(mediaInfo, false, false);
			blackEncodingParams = borhan.ffmpegParams.buildBlackInputParams(mediaInfo);

			This.encodingId = encodingParams.md5();
			BorhanLogger.debug('[' + This.uniqueLoopId + '] Encoding params for rendition [' + This.renditionId + '] and encodingId [ ' + This.encodingId + '] from file [' + localPath + ']: ' + encodingParams);
			BorhanCache.append(This.entryRequiredKey, '\n' + This.encodingId,
				function(){
					BorhanCache.get(This.entryRequiredKey,
						function(data){
							BorhanLogger.log('[' + This.uniqueLoopId + '] Entry required append occurred for key [' + This.entryRequiredKey + '] - now value is : ['  + JSON.stringify(data) + ']');
						},
						function(err){
							BorhanLogger.log('[' + This.uniqueLoopId + '] Entry required append no key found in cache for key [' +  This.entryRequiredKey + '] error was ' + err);
						});
				},
				function(err){
					BorhanLogger.log('[' + This.uniqueLoopId + '] Entry-Required key [' + This.entryRequiredKey + '] does not exist');
					BorhanCache.add(This.entryRequiredKey, This.encodingId, BorhanConfig.config.cache.entryHandled);
				});

			var encodingParamsKey = BorhanCache.getEncodingParams(This.encodingId);
			var mediaInfoKey = BorhanCache.getMediaInfo(This.encodingId);
			var blackEncodingParamsKey = BorhanCache.getBlackEncodingParams(This.encodingId);
			BorhanCache.set(mediaInfoKey, mediaInfo, BorhanConfig.config.cache.encodingParams);
			BorhanCache.set(encodingParamsKey, encodingParams, BorhanConfig.config.cache.encodingParams);
			BorhanCache.set(blackEncodingParamsKey, blackEncodingParams + ' ' + encodingParams, BorhanConfig.config.cache.encodingParams);
		});
	},

	
	/**
	 * Save sync-point data to cache
	 * @param entryId
	 * @param segment object {sequence, url, resolvedUrl, duration}
	 * @param syncPoint BorhanSyncPoint
	 */
	handleSyncPoint: function(entryId, segment, syncPoint){
		BorhanLogger.log('[' + this.uniqueLoopId + '] Entry [' + entryId + '] segment [' + segment.sequence + '] segment pts [' + segment.pts + ']');
		BorhanLogger.debug('[' + this.uniqueLoopId + '] ' + JSON.stringify(syncPoint));

		var offsetInSegment = (syncPoint.pts - segment.pts) / 90;
		var segmentOffset = syncPoint.offset - offsetInSegment;
		var segmentTimestamp = syncPoint.timestamp - offsetInSegment;
		
		this.elapsedTime = {
			sequence: segment.sequence,
    		duration: segment.duration,
			offset: segmentOffset,
			timestamp: segmentTimestamp // in milliseconds since 1970
		};
		
		BorhanCache.set(this.elapsedTimeKey, this.elapsedTime, BorhanConfig.config.cache.elapsedTime);
	},

	
	/**
	 * Parse cue-points and sync-points from segment metadata
	 * 
	 * @param entryId
	 * @param segment object {sequence, url, resolvedUrl, duration}
	 * @param buffer Array <segment>
	 */
	parseCuePoints: function(entryId, segment, buffer){
		var parsed = id3Reader.parseBuffer(buffer);
		BorhanLogger.log('[' + this.uniqueLoopId + '] Entry [' + entryId + '] segment [' + segment.sequence + ']');
		
		if(!parsed.id3tags.length){
			return;
		}

		segment.pts = parsed.videoPts ? parsed.videoPts : parsed.audioPts;
		for (var i = 0; i < parsed.id3tags.length; i++) {
			var id3tag = parsed.id3tags[i];
			if (id3tag.PTS && id3tag.TEXT && id3tag.TEXT.TEXT) {
				var cuePoint = JSON.parse(id3tag.TEXT.TEXT);
				cuePoint.pts = id3tag.PTS;
				if (cuePoint.objectType && cuePoint.objectType == 'BorhanSyncPoint') { 
					this.handleSyncPoint(entryId, segment, cuePoint);
				}
			}
		}
	},
	
	
	/**
	 * Parse m3u8 manifest
	 * @param manifestContent
	 * @returns object {headers, segments, footers}
	 */
	parseM3U8 : function(manifestContent){
		BorhanLogger.debug('[' + this.uniqueLoopId + '] ' + manifestContent);
		var manifest = {
			headers: {},
			segments: [],
			footers: {}
		};
		
		var segmentInfo = {};
		var lastSequenceNum = null;
		var extMediaSequence = null;
		var skipFirstSegment = false; //skip first segment to avoid 404 errors on ts
		var m3u8Lines = manifestContent.split('\n');
		for(var i = 0; i < m3u8Lines.length; i++){
			var m3u8Line = m3u8Lines[i].trim();
			if(m3u8Line.length == 0)
				continue;
			
			if(m3u8Line[0] != '#'){
				if(!skipFirstSegment){
					skipFirstSegment = true;
					continue;
				}
				if(lastSequenceNum == null){
					extMediaSequence = manifest.headers['EXT-X-MEDIA-SEQUENCE'] * 1;
					lastSequenceNum = extMediaSequence;
				}
				
				segmentInfo.url = m3u8Line;
				segmentInfo.resolvedUrl = url.resolve(this.masterUrl, m3u8Line);
				segmentInfo.sequence = lastSequenceNum;
				manifest.segments.push(segmentInfo);
				segmentInfo = {};
				lastSequenceNum += 1;
				continue;
			}
				
			var splittedLine = m3u8Line.substr(1).split(':', 2);
			if(splittedLine.length < 2)
				splittedLine.push('');
	
			var key = splittedLine[0];
			var value = splittedLine[1];
			
			switch(key){
				case 'EXT-X-ENDLIST':
					manifest.footers[key] = value;
					break;
					
				case 'EXTINF':
					if(value.substr(-1) == ',')
						value = value.trim(0, value.length - 1);
	
					value = parseFloat(value);
					segmentInfo[key] = value;
					segmentInfo.duration = parseInt(value * 1000);
					break;
					
				case 'EXT-X-DISCONTINUITY':
					if(value.substr(-1) == ',')
						value = value.trim(0, value.length - 1);
					
					segmentInfo[key] = value;
					break;

				case 'EXT-X-MEDIA-SEQUENCE':
					value = (parseInt(value) + 1).toString();
					
					manifest.headers[key] = value;
					break;	
					
				default:
					manifest.headers[key] = value;
			}
		}
		
		BorhanLogger.debug('[' + this.uniqueLoopId + '] Manifest after parse: ' + JSON.stringify(manifest));
		return manifest;
	},
	
	
	/**
	 * Build m3u8 manifest
	 * 
	 * @param headers
	 * @param segments
	 * @param footers
	 * @returns string
	 */
	buildM3U8 : function(headers, segments, footers) {
		result = '';
		
		for(var key in headers){
			var value = headers[key];
			result += "#" + key;
			if(value.length > 0)
				result += ":" + value;
			result += '\n';
		}
			
		for(var i = 0; i < segments.length; i++){
			var segment = segments[i];
			segmentUrl = segment.url;
			
			BorhanLogger.debug('[' + this.uniqueLoopId + '] Append segment [' + segment.sequence + '] duration [' + segment.duration + '] URL: ' + segmentUrl);
			
			result += '#EXTINF:' + (segment.duration / 1000).toFixed(3) + ',\n';
			result += segmentUrl + '\n';
		}
	
		for(var key in footers){
			var value = footers[key];
			result += '#' + key;
			if(value.length > 0)
				result += ':' + value;
			result += '\n';
		}
		
		BorhanLogger.debug('[' + this.uniqueLoopId + '] ' + result);
		return result;
	}
};

/**
 * @service stream
 */
var BorhanStreamManager = function(){
};
util.inherits(BorhanStreamManager, borhan.BorhanManager);

/**
 * Start watching rendition manifest
 * 
 * @action stream.watch
 * 
 * @param url
 * @param entryId
 * @param masterUrl
 */
BorhanStreamManager.prototype.watch = function(request, response, params){
	params = this.parsePlayServerParams(response, params, ['url', 'entryId', 'masterUrl', 'partnerId']);
	if(!params)
		return;
	
	response.dir(params);
	
	this.callRestorableAction('stream', 'watchRendition', params);

	response.debug('Handled');
	this.okResponse(response, 'OK', 'text/plain');
};


/**
 * Restorable action, run as long as the entry watch is required
 * 
 * @param params {url, entryId, masterUrl}
 * @param finishCallback called when the watch is not needed anymore and the restoreable action could be unstored
 */
BorhanStreamManager.prototype.watchRendition = function(params, finishCallback){
	BorhanLogger.log('watch Rendition for entry ' + params.entryId);
	BorhanLogger.dir(params);
	new BorhanStreamWatcher(this, params, finishCallback);
};

module.exports.BorhanStreamManager = BorhanStreamManager;
