
var os = require('os');
var util = require('util');

var borhan = module.exports = require('../BorhanManager');
borhan.tsPreparer = require('../media/BorhanTsPreparer');
borhan.tsPreparer.setLogger(BorhanLogger);


/**
 * @service segment
 */
var BorhanSegmentManager = function(){
};
util.inherits(BorhanSegmentManager, borhan.BorhanManager);

BorhanSegmentManager.MAX_DVR_LENGTH = 24 * 60 * 60;

/**
 * Stitch the segment
 * 
 * @param segmentId
 * @param offset
 * @param portion
 * @param inputFiles Array
 */
BorhanSegmentManager.prototype.exec = function(segmentId, cutOffset, portion, inputFiles, callback, errorCallback){
	var leftPortion = (portion == 'left');
		
	var ffmpegBin = BorhanConfig.config.bin.binDir + '/ffmpeg';
	var ffprobeBin = BorhanConfig.config.bin.binDir + '/ffprobe';
	if(BorhanConfig.config.bin.ffmpegPath){
		ffmpegBin = BorhanConfig.config.bin.ffmpegPath;
	}
	if(BorhanConfig.config.bin.ffprobePath){
		ffprobeBin = BorhanConfig.config.bin.ffprobePath;
	}
	
	BorhanLogger.debug('tsCutter: ' + JSON.stringify({
		ffmpegBin: ffmpegBin, 
		ffprobeBin: ffprobeBin, 
		cutOffset: cutOffset, 
		leftPortion: leftPortion, 
		inputFiles: inputFiles
	}));

	borhan.tsPreparer.cutTsFiles(ffmpegBin, ffprobeBin, cutOffset, leftPortion, inputFiles, function(err, data){
		if(err){
			BorhanLogger.log('Failed to cutTsFiles, segmentId [' + segmentId + '] ');
			errorCallback(err);
			return;
		}		
		var segmentMediaKey = BorhanCache.getSegmentMedia(segmentId);
		BorhanLogger.debug('Saving [' + segmentMediaKey + '] to cache');
		borhan.tsPreparer.savePreparedTsToMemcache(BorhanCache.binserverSet, segmentMediaKey, data, BorhanSegmentManager.MAX_DVR_LENGTH, function(error){
			if(error){
				BorhanLogger.log('Failed to save [' + segmentMediaKey + '] to cache');
				errorCallback(err);
				return;
			}	
			callback();
		});
		
	});
};


/**
 * Stitch black segment and save to cache
 * 
 * @action segment.stitchBlack
 * @param encodingId
 */
BorhanSegmentManager.prototype.stitchBlack = function(request, response, params){
	params = this.parsePlayServerParams(response, params, ['encodingId']);
	if(!params)
		return;
	
	response.dir(params);

	var outputPath = BorhanConfig.config.cloud.sharedBasePath + '/tmp/black-' + params.encodingId;
	
	var ffmpegPath = BorhanConfig.config.bin.binDir + '/ffmpeg';
	if(BorhanConfig.config.bin.ffmpegPath){
		ffmpegPath = BorhanConfig.config.bin.ffmpegPath;
	}
	
	var ffprobePath = BorhanConfig.config.bin.binDir + '/ffprobe';
	if(BorhanConfig.config.bin.ffprobePath){
		ffprobePath = BorhanConfig.config.bin.ffprobePath;
	}

	var This = this;
	var blackEncodingParamsKey = BorhanCache.getBlackEncodingParams(params.encodingId);
	BorhanCache.get(blackEncodingParamsKey, function(blackEncodingParams){

		response.debug('Handled');
		This.okResponse(response, 'OK', 'text/plain');
		
		if(!blackEncodingParams)
			return;
		
		var cmd = [
			ffmpegPath,
			blackEncodingParams, 
			'-y', 
			outputPath
		];
		cmd = cmd.join(' ');
		
		cmd.exec(function(){
			borhan.tsPreparer.prepareTsFiles(ffprobePath, [outputPath], function(err, data){
				if(err){
					BorhanLogger.error('Failed to prepareTsFiles for black media');
					return;
				}		
				var blackMediaKey = BorhanCache.getBlackMedia(params.encodingId);
				BorhanLogger.debug('Saving [' + blackMediaKey + '] to cache');
				borhan.tsPreparer.savePreparedTsToMemcache(BorhanCache.binserverSet, blackMediaKey, data, BorhanSegmentManager.MAX_DVR_LENGTH, function(error){
					if(error){
						BorhanLogger.rrror('Failed to save [' + blackMediaKey + '] to cache');
						return;
					}		
				});
				
			});
		});
	});
};


/**
 * Stitch pre and post ad segment and save to cache
 * 
 * @action segment.stitch
 * @param segmentId
 * @param url1
 * @param url2
 * @param url3
 * @param offset
 * @param portion
 */
BorhanSegmentManager.prototype.stitch = function(request, response, params){
	params = this.parsePlayServerParams(response, params, ['segmentId', 'url1', 'url2', 'url3', 'offset', 'portion']);
	if(!params)
		return;
	
	response.dir(params);
	
	var This = this;
	var urls = [params.url1, params.url2, params.url3];
	var localPaths = [];
	for(var i = 0; i < urls.length; i++){
		localPaths[i] = BorhanConfig.config.cloud.sharedBasePath + '/segments/' + urls[i].md5();
	}
	BorhanUtils.downloadMultiHttpUrls(urls, localPaths, function(localPaths){
		if(response.headersSent){
			response.debug('Headers where alreay sent to the client, attempting to exec stich segment, original request probably got timed out!!!');
			This.exec(params.segmentId, params.offset, params.portion, localPaths, function(){
				BorhanCache.set(BorhanCache.getMetadataReady(params.segmentId), true, BorhanConfig.config.cache.adMedia);
			}, function(err){
				response.error('Failed to stitch segment: ' + err);
			});
		}
		else{
			if(!This.run){
				response.log('Canceled');
				This.okResponse(response, 'Stopped', 'text/plain');
				return;
			}
			This.exec(params.segmentId, params.offset, params.portion, localPaths, function(){
				BorhanCache.set(BorhanCache.getMetadataReady(params.segmentId), true, BorhanConfig.config.cache.adMedia, function(){
					response.debug('Handled');
					This.okResponse(response, 'OK', 'text/plain');								
				}, function(err){
					This.errorResponse(response, 500, err);
				});
			}, function(err){
				This.errorResponse(response, 500, err);
			});
		}
	}, 
	function(err){
		This.errorResponse(response, 500, err);
	});
};

module.exports.BorhanSegmentManager = BorhanSegmentManager;
