
var os = require('os');
var memcached = require('memcached');
var memcachedbin = require('./memcachedbin'); //TODO - move to a single cache
var memjs = require('memjs'); // TODO use this lib only
var path = require('path');

BorhanCache = {
	config : null,
	server : null,
	binserver: null,
	binserverSet: null,
		
	init: function(){
		this.config = BorhanConfig.config.memcache;
		this.server = new memcached(this.config.hostname + ':' + this.config.port, this.config);
		
		this.binserver = new memcachedbin();
		this.binserver.host = this.config.hostname;
		this.binserver.port = this.config.port;

//		this.binserver.on('connect', function() {
//		TODO: start server async	
//		});

		this.binserver.connect();
		
		this.binserverSet = memjs.Client.create(this.config.hostname + ':' + this.config.port);
	},

	getManifestId : function(manifestUrl) {
		if(BorhanConfig.config.cache.hackWowzaUniqueSession && parseInt(BorhanConfig.config.cache.hackWowzaUniqueSession)){
    		// hack Wowza per session unique key
			manifestUrl = manifestUrl.replace(/\/chunklist_w\d+_(b\d+).m3u8$/, 'chunklist_$1.m3u8');
		}
		
		return manifestUrl.md5();
	},

	getServerProcesses : function() {
		return 'serverProcesses-' + os.hostname();
	},
	
	getProcessActions : function(pid) {
		if(!pid){
			pid = process.pid;
		}
			
		return 'processActions-' + pid;
	},

	getCuePoints : function(entryId) {
		return 'entryCuePoints-' + entryId;
	},

	getElapsedTime : function(entryId) {
		return 'entryElapsedTime-' + entryId;
	},
	
	getOldestSegmentTime : function(entryId) {
		return 'oldestSegmentTime-' + entryId;
	},

	getEntryRequired : function(entryId) {
		return 'entryRequired-' + entryId;
	},
	
	getRenditionManifestHandled :function(manifestUrl) {
		return 'renditionManifestHandled-' + this.getManifestId(manifestUrl);
	}, 

	getManifestContent : function(manifestId) {
		return 'manifestContent-' + manifestId;
	},

	getAdHandled : function(serverAdId) {
		return 'adHandled-' + serverAdId;
	},

	getBlackHandled : function(encodingId) {
		return 'blackHandled-' + encodingId;
	},

	getAdMedia : function(serverAdId) {
		return 'adMedia-' + serverAdId;
	},

	getSegmentMedia : function(segmentId) {
		return 'segmentMedia-' + segmentId;
	},

	getBlackMedia : function(encodingId) {
		return 'blackMedia-' + encodingId;
	},

	getAdMediaMetadata : function(serverAdId) {
		return 'adMedia-' + serverAdId + '-metadata';
	},

	getSegmentMediaMetadata : function(segmentId) {
		return 'segmentMedia-' + segmentId + '-metadata';
	},

	getMetadataReady : function(id) {
		return 'metadataReady-' + id;
	},
	
	getBlackMediaMetadata : function(encodingId) {
		return 'blackMedia-' + encodingId + '-metadata';
	},

	getLastUsedSegment : function(manifestUrl) {
		return 'lastUsedSegment-' + this.getManifestId(manifestUrl);
	},

	getEncodingParams : function(encodingId) {
		return 'encodingParams-' + encodingId;
	},

	getMediaInfo : function(encodingId) {
		return 'mediaInfo-' + encodingId;
	},

	getBlackEncodingParams : function(encodingId) {
		return 'blackEncodingParams-' + encodingId;
	},

	getServerAdId : function(cuePointId, renditionId, sessionId) {
		return 'serverAdId-' + cuePointId + '-' + renditionId + '-' + sessionId;
	},

	getSegmentId : function(portion, cuePointId, renditionId) {
		return (portion + '-' + cuePointId + '-' + renditionId).md5();
	},

	getPreSegmentId : function(cuePointId, renditionId) {
		return this.getSegmentId('left', cuePointId, renditionId);
	},

	getPostSegmentId : function(cuePointId, renditionId) {
		return this.getSegmentId('right', cuePointId, renditionId);
	},
	
	getEntry : function(entryId) {
		return 'entry-' + entryId;
	},
	
	getCuePointUrl : function(cuePointId) {
		return 'cuePointUrl-' + cuePointId;
	},
	
	getAdTrackingId : function(cuePointId, userId) {
		return 'tracking-' + cuePointId + '-' + userId;
	},
	
	getFileDownloading: function(filePath){
		var fileName = path.basename(filePath);
		return 'fileDownloading-' + fileName.md5();
	},
	
	getUiConfConfig: function(uiConfId){
		return 'uiConfConfig-' + uiConfId;
	},
	
	getStack : function() {
		return new Error();
	},
	
	getEncodingIdFromMediaInfo: function(mediaInfoKey){
		return mediaInfoKey.substring('mediaInfo-'.length);
	},

	getCuePointHandled: function(cuePointId, sessionId){
		return 'cuePointHandled-' + cuePointId + '-' + sessionId;
	},
	
	getCuePointWatcherHandled: function(entryId){
		return 'cuePointWatcherHandled-' + entryId;
	},
	
	getCanPlayAd: function(cuePointId, sessionId){
		return 'canPlayAd-' + cuePointId + '-' + sessionId;
	},
	
	get : function(key, callback, errorCallback) {
		var stackSource = this.getStack();
		BorhanLogger.debug('Cache.get [' + key + ']...', stackSource);
		this.server.get(key, function(err, data){
			if(err){
				var errMessage = 'Cache.get [' + key + ']:' + err;
				if(errorCallback){
					errorCallback(errMessage);
				}
				else{
					BorhanLogger.error(errMessage + "\n" + stackSource.stack, stackSource);
				}
			}
			else{
				BorhanLogger.debug('Cache.get [' + key + ']: OK', stackSource);
				if(callback)
					callback(data);
			}
		});
	},

	set : function(key, value, lifetime, callback, errorCallback) {
		if(!lifetime || isNaN(lifetime)){
			throw new Error('Cache.set [' + key + ']: lifetime [' + lifetime + '] is not numeric');
		}
		lifetime = parseInt(lifetime);
		var stackSource = this.getStack();
		this.server.set(key, value, lifetime, function(err){
			if(err){
				var errMessage = 'Cache.set [' + key + ']:' + err;
				if(errorCallback){
					errorCallback(errMessage);
				}
				else{
					BorhanLogger.error(errMessage + "\n" + stackSource.stack, stackSource);
				}
			}
			else{
				BorhanLogger.debug('Cache.set [' + key + ']: OK', stackSource);
				if(callback)
					callback();
			}
		});
	},

	touch : function(key, lifetime, callback, errorCallback) {
		if(!lifetime || isNaN(lifetime)){
			throw new Error('Cache.touch [' + key + ']: lifetime [' + lifetime + '] is not numeric');
		}
		lifetime = parseInt(lifetime);
		var stackSource = this.getStack();
		var cacheTouchCallback = function(err){
			if(err){
				var errMessage = 'Cache.touch [' + key + ']:' + err;
				if(errorCallback){
					errorCallback(errMessage);
				}
				else{
					BorhanLogger.error(errMessage + "\n" + stackSource.stack, stackSource);
				}
			}
			else{
				BorhanLogger.debug('Cache.touch [' + key + ']: OK', stackSource);
				if(callback)
					callback();
			}
		};
		
		if(parseInt(this.config.touchEnabled)){
			this.server.touch(key, lifetime, function(err, value){
				if(err){
					cacheTouchCallback(err);
				}
				else if(value){
					cacheTouchCallback();
				}
				else{
					cacheTouchCallback('value is null');
				}
			});
		}
		else{
			var This = this;
			this.server.get(key, function(err, value){
				if(err){
					cacheTouchCallback(err);
				}
				else if(value){
					This.server.set(key, value, lifetime, cacheTouchCallback);
				}
				else{
					cacheTouchCallback('value is null');
				}
			});
		}
	},

	add : function(key, value, lifetime, callback, errorCallback) {
		if(!lifetime || isNaN(lifetime)){
			throw new Error('Cache.set [' + key + ']: lifetime [' + lifetime + '] is not numeric');
		}
		lifetime = parseInt(lifetime);
		var stackSource = this.getStack();
		this.server.add(key, value, lifetime, function(err){
			if(err){
				var errMessage = 'Cache.add [' + key + ']:' + err;
				if(errorCallback){
					errorCallback(errMessage);
				}
				else{
					BorhanLogger.error(errMessage + "\n" + stackSource.stack, stackSource);
				}
			}
			else{
				BorhanLogger.debug('Cache.add [' + key + ']: OK', stackSource);
				if(callback)
					callback();
			}
		});
	},

	append : function(key, value, callback, errorCallback) {
		var stackSource = this.getStack();
		this.server.append(key, value, function(err){
			if(err){
				var errMessage = 'Cache.append [' + key + ']:' + err;
				if(errorCallback){
					errorCallback(errMessage);
				}
				else{
					BorhanLogger.error(errMessage + "\n" + stackSource.stack, stackSource);
				}
			}
			else{
				BorhanLogger.debug('Cache.append [' + key + ']: OK', stackSource);
				if(callback)
					callback();
			}
		});
	},

	getMulti : function(keys, callback, errorCallback) {
		var stackSource = this.getStack();
		var missingAnswers = keys.length;
		var answers = {};
		
		keys.forEach(function(key, index, array){
			BorhanCache.server.get(key, function(err, data){
    			if(err){
    				var errMessage = 'Cache.getMulti [' + key + ']:' + err;
    				if(errorCallback){
    					errorCallback(errMessage);
    				}
    				else{
    					BorhanLogger.error(errMessage + "\n" + stackSource.stack, stackSource);
    				}
    			}
    			else{
    				BorhanLogger.debug('Cache.getMulti [' + key + ']: OK', stackSource);
    				answers[key] = data;
        			missingAnswers--;
    				if(!missingAnswers && callback)
    					callback(answers);
    			}
    		});
		});
	},

	del : function(key, callback, errorCallback) {
		var stackSource = this.getStack();
		return this.server.del(key, function(err){
			if(err){
				var errMessage = 'Cache.del [' + key + ']:' + err;
				if(errorCallback){
					errorCallback(errMessage);
				}
				else{
					BorhanLogger.error(errMessage + "\n" + stackSource.stack, stackSource);
				}
			}
			else{
				BorhanLogger.debug('Cache.del [' + key + ']: OK', stackSource);
				if(callback)
					callback();
			}
		});
	},

	replace : function(key, value, lifetime, callback, errorCallback) {
		if(!lifetime || isNaN(lifetime)){
			throw new Error('Cache.set [' + key + ']: lifetime [' + lifetime + '] is not numeric');
		}
		lifetime = parseInt(lifetime);
		var stackSource = this.getStack();
		return this.server.replace(key, value, lifetime, function(err){
			if(err){
				var errMessage = 'Cache.replace [' + key + ']:' + err;
				if(errorCallback){
					errorCallback(errMessage);
				}
				else{
					BorhanLogger.error(errMessage + "\n" + stackSource.stack, stackSource);
				}
			}
			else{
				BorhanLogger.debug('Cache.replace [' + key + ']: OK', stackSource);
				if(callback)
					callback();
			}
		});
	},
	
	getBinary : function(key, callback, errorCallback) {
		var stackSource = this.getStack();
		BorhanLogger.debug('Cache.getBinary [' + key + ']...', stackSource);
		this.binserver.get(key, function(err, data){
			if(err){
				var errMessage = 'Cache.getBinary [' + key + ']:' + err;
				if(errorCallback){
					errorCallback(errMessage);
				}
				else{
					BorhanLogger.error(errMessage + "\n" + stackSource.stack, stackSource);
				}
			}
			else{
				BorhanLogger.debug('Cache.getBinary [' + key + ']: OK', stackSource);
				if(callback)
					callback(data);
			}
		});
	},
	
	getMultiBinary : function(keys, callback, errorCallback) {
		var stackSource = this.getStack();
		var missingAnswers = keys.length;
		var answers = {};
		
		keys.forEach(function(key, index, array){
			BorhanCache.binserver.get(key, function(err, data){
    			if(err){
    				var errMessage = 'Cache.getMultiBinary [' + key + ']:' + err;
    				if(errorCallback){
    					errorCallback(errMessage);
    				}
    				else{
    					BorhanLogger.error(errMessage + "\n" + stackSource.stack, stackSource);
    				}
    			}
    			else{
    				BorhanLogger.debug('Cache.getMultiBinary [' + key + ']: OK', stackSource);
    				answers[key] = data;
        			missingAnswers--;
    				if(!missingAnswers && callback)
    					callback(answers);
    			}
    		});
		});
	},
};
BorhanCache.init();
