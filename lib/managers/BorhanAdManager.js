
var os = require('os');
var util = require('util');
var fs = require('fs');

var borhan = module.exports = require('../BorhanManager');
borhan.tsPreparer = require('../media/BorhanTsPreparer');
borhan.tsPreparer.setLogger(BorhanLogger);

/**
 * @service ad
 */
var BorhanAdManager = function(){
};
util.inherits(BorhanAdManager, borhan.BorhanManager);

/**
 * Save the ad media to cache
 * 
 * @param serverAdId
 * @param adPath
 */
BorhanAdManager.prototype.save = function(serverAdId, adPath){

	var serverAdKey = BorhanCache.getAdMedia(serverAdId);
	var adTsPath = BorhanConfig.config.cloud.sharedBasePath + '/ad_ts/' + serverAdId;
	
	var writeTsFile = function(data){
		var fd = fs.createWriteStream(adTsPath);
		fd.on('finish', function () {
			  BorhanLogger.log('Ad ts saved to file system [' + adTsPath + ']');
		});
		
		BorhanUtils.writeToFileByLength(fd, data.metadata);
		BorhanUtils.writeToFileByLength(fd, data.data);
		BorhanUtils.writeToFileByLength(fd, data.header);

		fd.end();		
	};
	
	var readTsFile = function(callback, errorCallback){		
		var readAllItems = function(fd, callback, errorCallback){
			var data = {};
			BorhanUtils.readFromFileByLength(fd, function(metadata){
				data.metadata = metadata;
				BorhanUtils.readFromFileByLength(fd, function(dataVal){
					data.data = dataVal;
					BorhanUtils.readFromFileByLength(fd, function(header){
						data.header = header;
						callback(data);
					}, errorCallback);
				}, errorCallback);				
			}, errorCallback);		
		};
				
		fs.open(adTsPath, 'r', function(err, fd){
			if(err){
				errorCallback(err);
				return;
			}
			readAllItems(fd, function(data){
				fs.close(fd);
				callback(data);
			}), function(err){
				fs.close(fd);
				callback(data);
			};
		});
	};
	
	fs.exists(adTsPath, function(exists){
		if(exists){
			BorhanLogger.debug('Ad prepared ts at [' + adTsPath + '] already exists on the file system');
			readTsFile(function(data){
				BorhanLogger.debug('Saving to cache [' + serverAdKey + ']');
				borhan.tsPreparer.savePreparedTsToMemcache(BorhanCache.binserverSet, serverAdKey, data, BorhanConfig.config.cache.adMedia, function(error){
					if(error){
						BorhanLogger.error('Failed to save in cache [' + serverAdKey + ']: ' + error);
						return;
					}			
					BorhanCache.set(BorhanCache.getMetadataReady(serverAdId), true, BorhanConfig.config.cache.adMedia);
				});							
			}, function(err){
				BorhanLogger.error('Failed to get ts data from file system [' + adTsPath + ']: ' + err);
				return;
			});
		}
		else{
			var ffprobePath = BorhanConfig.config.bin.binDir + '/ffprobe';
			if(BorhanConfig.config.bin.ffprobePath){
				ffprobePath = BorhanConfig.config.bin.ffprobePath;
			}

			BorhanLogger.debug('Saving path[' + adPath + '] server-ad [' + serverAdKey + ']');
			
			borhan.tsPreparer.prepareTsFiles(ffprobePath, [adPath], function(err, data){
				if(err){
					BorhanLogger.error('Failed in prepareTsFiles for [' + serverAdKey + ']: ' + err);
					return;	
				}
				//permanently save ts's on file system
				writeTsFile(data);
			
				BorhanLogger.debug('Saving to cache [' + serverAdKey + ']');
				borhan.tsPreparer.savePreparedTsToMemcache(BorhanCache.binserverSet, serverAdKey, data, BorhanConfig.config.cache.adMedia, function(error){
					if(error){
						BorhanLogger.error('Failed to save in cache [' + serverAdKey + ']: ' + error);
						return;
					}			
					BorhanCache.set(BorhanCache.getMetadataReady(serverAdId), true, BorhanConfig.config.cache.adMedia);
				});				
			});			
		}		
	});
};


/**
 * Executes ffmpef 
 * 
 * @param serverAdId
 * @param sourcePath
 * @param encodingParams
 */
BorhanAdManager.prototype.exec = function(serverAdId, sourcePath, encodingParams){
	var adPath = BorhanConfig.config.cloud.sharedBasePath + '/ad_transcode/' + serverAdId;
	var This = this;
	fs.exists(adPath, function(exists){
		if(exists){
			BorhanLogger.debug('File [' + adPath + '] already exists on the file system');
			This.save(serverAdId, adPath);
		}
		else{
			var maxFfmpegProcesses = 10;
			if(BorhanConfig.config.ad.ffmpeg_max_processes){
				maxFfmpegProcesses = parseInt(BorhanConfig.config.ad.ffmpeg_max_processes);
			}
			var ffmpegPath = BorhanConfig.config.bin.binDir + '/ffmpeg';
			if(BorhanConfig.config.bin && BorhanConfig.config.bin.ffmpegPath){
				ffmpegPath = BorhanConfig.config.bin.ffmpegPath;
			}

			var ffmpegProcessesCmd = BorhanConfig.config.bin.binDir + '/count_ffmpeg_processes.sh ' + ffmpegPath;
			ffmpegProcessesCmd.exec(function(numberOfProccesses){
				if(parseInt(numberOfProccesses.trim()) > maxFfmpegProcesses){
					BorhanLogger.error('Number of ffmpeg processes exceeded [' + numberOfProccesses + '], file ['+ adPath + ']');
				}
				else{
					BorhanLogger.log('Number of ffmpeg processes is [' + numberOfProccesses + '], transcoding file ['+ adPath + ']');
					var cmd = [
								ffmpegPath, 
								'-i',
								sourcePath, 
								encodingParams, 
								'-y',
								adPath];
							cmd = cmd.join(' ');
							
							cmd.exec(function(output){
								This.save(serverAdId, adPath);
							});			
				}					
			});	
		}
	});
};


/**
 * Stitch ad
 * 
 * @action ad.stitch
 * 
 * @param serverAdId
 * @param url
 * @param headers
 * @param encodingId
 */
BorhanAdManager.prototype.stitch = function(request, response, params){
	params = this.parsePlayServerParams(response, params, ['serverAdId', 'encodingId', 'sharedFilePath']);
	if(!params)
		return;
	
	response.dir(params);

	var This = this;
		
	var encodingKey = BorhanCache.getEncodingParams(params.encodingId);
	BorhanCache.get(encodingKey, function(encodingParams){
		response.debug('handled');
		This.okResponse(response, 'OK', 'text/plain');
			
		This.exec(params.serverAdId, params.sharedFilePath, encodingParams);
	}, function(err){
		response.error(err);
		This.errorResponse(response, 500, err);
	});

};


module.exports.BorhanAdManager = BorhanAdManager;
