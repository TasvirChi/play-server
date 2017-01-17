
var url = require('url');
var util = require('util');

var borhan = module.exports = require('../BorhanManager');

/**
 * @service cuePoints
 */
var BorhanCuePointsManager = function(){
	this.cuePoints = {};
	this.interval = null;
	this.lastUpdatedAt = null;
	
	this.initClient(BorhanConfig.config.client);
};
util.inherits(BorhanCuePointsManager, borhan.BorhanManager);

/**
 * @type handle to setInterval
 */
BorhanCuePointsManager.prototype.interval = null;

/**
 * @type object
 * 
 * key: entry id
 * value: object
 *  - finishCallback: function called when entry is not required anymore and restorable action could be unstored
 *  - cuePoints: object (key: cue-point id, value: BorhanCuePoint)
 */
BorhanCuePointsManager.prototype.cuePoints = null;

/**
 * @type int timestamd in seconds, used to fetch cue-points that changed in last few seconds
 */
BorhanCuePointsManager.prototype.lastUpdatedAt = null;


/**
 * @param entryId
 */
BorhanCuePointsManager.prototype.verifyEntryRequired = function(entryId){
	var entryRequiredKey = BorhanCache.getEntryRequired(entryId);
	var oldestSegmentTimeKey = BorhanCache.getOldestSegmentTime(entryId);
	var cuePointsKey = BorhanCache.getCuePoints(entryId);
	
	var This = this;
	var deleteCuePoint = function(){
		This.cuePoints[entryId].finishCallback();
		delete This.cuePoints[entryId];		
		BorhanCache.del(cuePointsKey);		
	};
	
	BorhanCache.get(entryRequiredKey, function(data){
		if(!data){
			BorhanLogger.debug('Deleting cue points for entry ' + entryId);
			deleteCuePoint();
		}
		else{
			var watcherHandledKey = BorhanCache.getCuePointWatcherHandled(entryId);
			BorhanCache.set(watcherHandledKey, true, BorhanConfig.config.cache.cuePointWatcherHandled);
			if(This.cuePoints[entryId] && This.cuePoints[entryId].cuePoints){
				BorhanCache.get(oldestSegmentTimeKey, function(oldestSegmentTime){
					if(oldestSegmentTime){
						for(var cuePointId in This.cuePoints[entryId].cuePoints){
							var cuePoint = This.cuePoints[entryId].cuePoints[cuePointId];
							if((cuePoint.startTime && oldestSegmentTime.offset > (cuePoint.startTime + cuePoint.duration)) || 
								(cuePoint.triggeredAt*1000 && oldestSegmentTime.timestamp > (cuePoint.triggeredAt*1000 + cuePoint.duration))){
								BorhanLogger.log('Deleting handled cue point from cache: [' + cuePointId + '] oldestSegmentTime [' + JSON.stringify(oldestSegmentTime) + ']');
								delete This.cuePoints[entryId].cuePoints[cuePointId];
							}
						}
					}
					BorhanCache.set(cuePointsKey, This.cuePoints[entryId].cuePoints, BorhanConfig.config.cache.cuePoint);		
				}, function(err){});		
			}
		}
	}, deleteCuePoint);
};

/**
 * @param cuePointsList BorhanCuePointListResponse
 * @param filter BorhanCuePointFilter
 * @param pager BorhanFilterPager
 */
BorhanCuePointsManager.prototype.handleCuePointsList = function(cuePointsList, filter, pager){
	if(!this.run){
		return;
	}
	
	if(!cuePointsList){
		BorhanLogger.error('Client [cuePoint.list] system error');
	}
	else if(cuePointsList.objectType == 'BorhanAPIException'){
		BorhanLogger.error('Client [cuePoint.list][' + cuePointsList.code + ']: ' + cuePointsList.message);
	}
	else{
		var This = this;
		
		if(cuePointsList.objects.length == pager.pageSize){
			pager.pageIndex++;
			this.client.cuePoint.listAction(function(nextCuePointsList){
				This.handleCuePointsList(nextCuePointsList, filter, pager);
			}, filter, pager);
		}
		
		for(var i = 0; i < cuePointsList.objects.length; i++){
			var cuePoint = cuePointsList.objects[i];
			var entryId = cuePoint.entryId;
			if(!this.cuePoints[entryId]){
				continue;
			}
			this.lastUpdatedAt = Math.max(this.lastUpdatedAt, cuePoint.updatedAt);
			
			this.cuePoints[entryId].cuePoints[cuePoint.id] = cuePoint;

			var cuePointsKey = BorhanCache.getCuePoints(entryId);
			BorhanCache.set(cuePointsKey, this.cuePoints[entryId].cuePoints, BorhanConfig.config.cache.cuePoint);
		}
	}
};


/**
 * List cue-points for all entries, executed periodically
 */
BorhanCuePointsManager.prototype.loop = function(){
	if(!this.sessionReady)
		return;
	
	var entryIds = [];
	for(var entryId in this.cuePoints){
		entryIds.push(entryId);
		this.verifyEntryRequired(entryId);
	}
	
	if(!entryIds.length){
		clearInterval(this.interval);
		BorhanLogger.log('No entries left to monitor, clearing cue points interval for pId ' + process.pid);
		this.interval = null;
		return;
	}
	
	var filter = new borhan.client.objects.BorhanAdCuePointFilter();
	filter.entryIdIn = entryIds.join(',');
	filter.statusEqual = borhan.client.enums.BorhanCuePointStatus.READY;
	filter.cuePointTypeEqual = borhan.client.enums.BorhanCuePointType.AD;
	if(this.lastUpdatedAt){
		//Added +1 to skip retrieving the last object fetched over and over again
		filter.updatedAtGreaterThanOrEqual = this.lastUpdatedAt + 1;
	}

	var pager = new borhan.client.objects.BorhanFilterPager();
	pager.pageSize = 500;
	
	var This = this;
	this.client.cuePoint.listAction(function(cuePointsList){
		This.handleCuePointsList(cuePointsList, filter, pager);
	}, filter, pager);
};


/**
 * Add entry to be watched
 * 
 * @action cuePoints.watch
 * 
 * @param entryId
 */
BorhanCuePointsManager.prototype.watch = function(request, response, params){
	params = this.parsePlayServerParams(response, params, ['entryId', 'partnerId']);
	if(!params)
		return;

	response.dir(params);

	if(this.cuePoints[params.entryId]){
		This.okResponse(response, 'Entry [' + params.entryId + '] already watched', 'text/plain');
		return;
	}
	else{
		this.callRestorableAction('cuePoints', 'watchEntry', params);		
	}

	this.okResponse(response, 'OK', 'text/plain');
};


/**
 * Restorable action, add entry to be watched
 * 
 * @param params.entryId
 * @param finishCallback function to be called when this entry watch is not needed anymore
 */
BorhanCuePointsManager.prototype.watchEntry = function(params, finishCallback){
	BorhanLogger.log('watch CuePoints for entry ' + params.entryId);
	BorhanLogger.dir(params);
	
	this.cuePoints[params.entryId] = {
		finishCallback: finishCallback,
		cuePoints: {}
	};
	
	if(!this.interval){
		var This = this;
		this.interval = setInterval(function(){
			if(!This.run){
				clearInterval(This.interval);
				BorhanLogger.log('Run variable is false clearing cue points interval for pId ' + process.pid);
				This.interval = null;
				return;
			}
			
			This.loop();
		}, 10000);
	}
	
	this.loop();
};

module.exports.BorhanCuePointsManager = BorhanCuePointsManager;
