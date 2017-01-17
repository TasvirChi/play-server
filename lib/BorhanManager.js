
var os = require('os');
var fs = require('fs');
var url = require('url');
var util = require('util');
var http = require('http');
var querystring = require('querystring');

var borhan = module.exports = require('./BorhanBase');
borhan.client = require('./client/BorhanClient');
require('./utils/BorhanUiConfParser');

var BorhanManager = function() {
};
util.inherits(BorhanManager, borhan.BorhanBase);

/**
 * @type BorhanClient
 */
BorhanManager.prototype.client = null;

/**
 * @type BorhanConfiguration
 */
BorhanManager.prototype.clientConfig = null;

/**
 * @type boolean indicates that the client session started and could be used
 */
BorhanManager.prototype.sessionReady = null;

/**
 * Instantiate the client lib and start session
 */
BorhanManager.prototype.initClient = function(config, callback){
	BorhanLogger.log('Initializing client');
	this.clientConfig = new borhan.client.BorhanConfiguration(parseInt(config.partnerId));
	
	for(var configKey in config)
		this.clientConfig[configKey] = config[configKey];

	this.clientConfig.setLogger(BorhanLogger);
	this.clientConfig.clientTag = 'play-server-' + this.hostname;

	var This = this;
	
	var type = borhan.client.enums.BorhanSessionType.ADMIN;
	this.sessionReady = false;
	this.client = new borhan.client.BorhanClient(this.clientConfig);
	var ksTimer = config.expiry;
	if(!ksTimer){
		ksTimer =  86400*1000 - 1000;
	}		
	this.client.session.start(function(ks){
		if(ks){
			This.client.setKs(ks);
			This.sessionReady = true;
			setTimeout(function(){ This.initClient(config, callback); }, ksTimer, config, callback);
			if(callback){
				callback();
			}			
		}
		else{
			BorhanLogger.error('Failed to start client session');
			ksTimer = 2*1000;
			setTimeout(function(){ This.initClient(config, callback); }, ksTimer, config, callback);
			if(callback){
				callback();
			}
		}

	}, config.secret, config.userId, type, config.partnerId, config.expiry, config.privileges);
};

BorhanManager.prototype.impersonate = function(partnerId){
	this.clientConfig.partnerId = partnerId;
	this.client.setConfig(this.clientConfig);		
};

BorhanManager.prototype.unimpersonate = function(config){
	this.clientConfig.partnerId = config.partnerId;
	this.client.setConfig(this.clientConfig);	
};

BorhanManager.prototype.getMissingParams = function(params, requiredParams){
	var missingParams = [];
	for(var i = 0; i < requiredParams.length; i++){
		var requiredParam = requiredParams[i];
		if(typeof params[requiredParam] === 'undefined'){
			missingParams.push(requiredParam);
		}
	}
	return missingParams;
};


BorhanManager.prototype.parsePlayServerParams = function(response, playServerParams, requiredParams){
	if (playServerParams.signature != this.getSignature(playServerParams.data)) {
		response.error('Wrong signature');
		this.errorResponse(response, 403, 'Forbidden\n');
		return null;
	}
	
	var str = new Buffer(playServerParams.data, 'base64').toString('ascii');
	var params = JSON.parse(str);
	params.partnerId = playServerParams.partnerId;
	var missingParams = this.getMissingParams(params, requiredParams);
	if(missingParams.length){
		response.error('Missing arguments [' + missingParams.join(', ') + ']');
		this.errorMissingParameter(response);
		return null;
	}
		
	return params;
};

BorhanManager.prototype.start = function(){
	this.run = true;
};

BorhanManager.prototype.stop = function(){
	this.run = false;
};

BorhanManager.prototype.restore = function(request, response, params){
	params = this.parsePlayServerParams(response, params, ['action', 'params']);
	if(!params)
		return;

	BorhanLogger.dir(params);
	
	this.callRestorableAction(params.service, params.action, params.params);

	response.debug('Restored');
	response.writeHead(200);
	response.end();
};

/**
 * check if the play server feature is allowed for partner
 * @param partner id
 * @param permissonName
 * @param callback
 */
BorhanManager.prototype.isPermissionAllowedForPartner = function(partnerId, permissonName, callback){
	var This = this;
	
	var checkIfPermissionAllowed = function(){
		var filter = new borhan.client.objects.BorhanPermissionFilter();
		filter.nameEqual = permissonName;
		
		pager = new borhan.client.objects.BorhanFilterPager();
		pager.pageSize = 1;
		
		This.impersonate(partnerId);
		This.client.permission.listAction(function(result) {
			if(!result){
				callback(false);
			}
			else if(result.objectType == 'BorhanAPIException'){
				BorhanLogger.error('Client [permission.list][' + result.code + ']: ' + result.message);
				callback(false);
			}
			else{
				if(result.totalCount && result.objects[0].name == permissonName){
					callback(true);
				}
				else{
					callback(false);
				}	
			}
		}, filter, pager);
	};
	
	if(!This.sessionReady){
		This.initClient(BorhanConfig.config.client, function(){
			checkIfPermissionAllowed();
		});
	}
	else{
		checkIfPermissionAllowed();
	}
};

/**
 * get the current ui conf config file from Borhan and store it in the cache
 * @param uiConfId
 * @param entryId
 * @param partnerId
 * @param callback
 */
BorhanManager.prototype.getAndStoreUiConfConfig = function(uiConfId, entryId, partnerId, callback){
	var callUiConfGetService = function(uiConfId){
		try{
			This.impersonate(partnerId);
			This.client.uiConf.get(function(result){
				This.unimpersonate(BorhanConfig.config.client);
				if(!result){
					callback(null);
				}
				else if(result.objectType == 'BorhanAPIException'){
					BorhanLogger.error('Client [uiConf.get][' + result.code + ']: ' + result.message);
					callback(null);
				}
				else{
					var uiConfConfig = BorhanUiConfParser.parseUiConfConfig(uiConfId, JSON.parse(result.config));
					var uiConfConfigfKey = BorhanCache.getUiConfConfig(uiConfId);
					BorhanCache.set(uiConfConfigfKey, uiConfConfig, BorhanConfig.config.cache.uiConfConfig);
					if(callback){
						callback(uiConfConfig);
					}					
				}
			}, uiConfId);
		}
		catch(e){
			BorhanLogger.error('Client failed to retrive ui conf [' + uiConfId + '] for entry [' + entryId + ']');
			callback(null);
		}
	};
	
	var This = this;
	
	if(!This.sessionReady){
		This.initClient(BorhanConfig.config.client, function(){
			callUiConfGetService(uiConfId);
		});
	}
	else{
		callUiConfGetService(uiConfId);
	}
};

module.exports.BorhanManager = BorhanManager;
