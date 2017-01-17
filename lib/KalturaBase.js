
var os = require('os');
var fs = require('fs');
var url = require('url');
var util = require('util');
var http = require('follow-redirects').http;
var crypto = require('crypto');
var querystring = require('querystring');

var borhan = {
	client: require('./client/BorhanClient')
};

require('./utils/BorhanUtils');
require('./utils/BorhanConfig');
require('./utils/BorhanCache');
require('./utils/BorhanLogger');

var BorhanBase = function() {
};

BorhanBase.processData = null;
BorhanBase.prototype = {
	hostname: os.hostname(),

	getSignature : function(data){
		return (BorhanConfig.config.cloud.secret + data).md5();
	},

	getHttpUrl : function(urlStr, headers, successCallback, errorCallback) {
		parsedUrl = url.parse(urlStr);
		var options = {
			hostname : parsedUrl.hostname,
			port : parsedUrl.port,
			path : parsedUrl.path,
			method : 'GET',
		};
		if (headers){
			options.headers = headers;
		}

		var request = http.request(options, function(response) {
			var fullData = '';
			response.on('data', function(data) {
				fullData += data;
			});
			response.on('end', function() {
				if(response.statusCode != 200){
					if(errorCallback){
						return errorCallback('Invalid http status: ' + response.statusCode);
					}
					else{
						BorhanLogger.error('Invalid http status: ' + response.statusCode + ' while trying to fetch ' + urlStr);
						return;
					}
				}
				if(successCallback){
					successCallback(fullData);
				}
			});
		});

		request.on('error', function(e) {
			if(errorCallback){
				errorCallback(e.message);
			}
		});

		request.end();
	},


	
	callPlayServerService : function(service, action, partnerId, params, headers, successCallback, failureCallback){
		if(params && params.partnerId){
			delete params.partnerId;
		}
		var data = new Buffer(JSON.stringify(params)).toString('base64');
		var signedParams = {
			data: data, 
			signature: this.getSignature(data)
		};
		
		var playServerUrl = this.getPlayServerUrl(service, action, partnerId, signedParams);
		BorhanLogger.log('Call [' + playServerUrl + ']');
		this.getHttpUrl(playServerUrl, headers, successCallback, failureCallback);
	},

	encrypt : function(params, encryptedParams){
		var cipher = crypto.createCipher('AES-256-CBC', BorhanConfig.config.cloud.secret);

		var encrypted;
		try{
			encrypted = cipher.update(querystring.stringify(encryptedParams), 'utf8', 'base64');
			encrypted += cipher.final('base64');
		}
		catch(exception){
			BorhanLogger.error(exception.stack);
			return null;
		}
		
		params.e = encrypted.split('/').join('_');
		return params;
	},

	decrypt : function(params){
		var decipher = crypto.createDecipher('AES-256-CBC', BorhanConfig.config.cloud.secret);

		var encrypted = params.e.split('_').join('/');
		delete params.e;
		
		var decrypted;
		try{
			decrypted = decipher.update(encrypted, 'base64', 'utf8');
			decrypted += decipher.final('utf8');
		}
		catch(exception){
			BorhanLogger.error(exception.stack);
			return null;
		}
		
		var decryptedParams = querystring.parse(decrypted);
		
		for(var key in decryptedParams){
			params[key] = decryptedParams[key];
		}
		
		return params;
	},

	getPlayServerUrl : function(service, action, partnerId, params, encryptedParams, domain){
		if(!domain && BorhanConfig.config[service].domain){
			domain = BorhanConfig.config[service].domain;
		}
		if(!domain){
			domain = BorhanConfig.config.cloud.domain;
		}
				
		var port = BorhanConfig.config[service].domainPort;
		if(!port){
			port = BorhanConfig.config.cloud.httpPort;
		}
		
		if(!params){
			params = {};
		}
		
		if(params.partnerId){
			delete params.partnerId;
		}
		
		if(encryptedParams && typeof encryptedParams != 'undefined'){
			params = this.encrypt(params, encryptedParams);
		}
		
		var playServerUrl = 'http://' + domain + ':' + port;
		playServerUrl += '/p/' + partnerId;
		playServerUrl += '/' + service + '/' + action;
		playServerUrl += '?' + querystring.stringify(params);
		
		return playServerUrl;
	},

	callRestorableAction : function(service, action, params){
		var actionId = BorhanUtils.getUniqueId();
		
		var actionData = {
			actionId: actionId, 
			service: service, 
			action: action, 
			params: params
		};
		
		var This = this;
		this[action](params, function(){
			This.unstoreAction(actionData);
		});
		
		this.storeAction(actionData);
	},

	restoreAction : function(actionData){
		BorhanLogger.debug('Action [' + actionData.actionId + ']');
		this.storeAction(actionData);
		actionData.params.restored = true;
		this.callPlayServerService(actionData.service, 'restore', actionData.params.partnerId, actionData);
	},

	storeAction : function(actionData){
		BorhanLogger.debug('Action [' + actionData.actionId + ']');

		var savedSuccessfully = function(err){
			BorhanLogger.debug('Action [' + actionData.actionId + '] saved successfully');	
		};
		
		var processActionsKey = BorhanCache.getProcessActions();
		if(BorhanBase.processData){
			BorhanBase.processData[actionData.actionId] = actionData;
			BorhanCache.set(processActionsKey, BorhanBase.processData, BorhanConfig.config.cache.restoreableAction, savedSuccessfully);
		}
		else{
			BorhanBase.processData = {};
			BorhanBase.processData[actionData.actionId] = actionData;
			BorhanCache.add(processActionsKey, BorhanBase.processData, BorhanConfig.config.cache.restoreableAction, function(){
				BorhanBase.processActionsInterval = setInterval(function(){
					BorhanCache.set(processActionsKey, BorhanBase.processData, BorhanConfig.config.cache.restoreableAction);
				}, (BorhanConfig.config.cache.restoreableAction - 5) * 1000);
				savedSuccessfully();
			}, function(err){
				BorhanCache.set(processActionsKey, BorhanBase.processData, BorhanConfig.config.cache.restoreableAction, savedSuccessfully, function(err){});
			});
		}
	},

	unstoreAction : function(actionData){
		BorhanLogger.debug('Action [' + actionData.actionId + ']');
		
		delete BorhanBase.processData[actionData.actionId];
		
		var processActionsKey = BorhanCache.getProcessActions();
		BorhanCache.set(processActionsKey, BorhanBase.processData, BorhanConfig.config.cache.restoreableAction);
	},

	setCookie : function(response, key, value, maxAge) {
		var options = {};
		
		if(maxAge){
			options.maxAge = maxAge;
		}
		
		response.setHeader('Set-Cookie', [key + '=' + value, options]);
	},

	getCookie : function(request, cookie) {
		if(!request.headers.cookie)
			return null;
		
	    var cookies = request.headers.cookie.split(';');
		for(var i = 0; i < cookies.length; i++) {
			var parts = cookies[i].split('=');
			if(parts.shift().trim() == cookie){
				return unescape(parts.join('='));
			}
		};
		return null;
	},

	okResponse: function(response, body, contentType){
		response.writeHead(200, {
			'Content-Type' : contentType,
			'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
			'Pragma': 'no-cache'
		});
		response.end(body);		
	},
	
	redirectResponse: function(response, location){
		response.writeHead(302, {
			'Location' : location,
			'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
			'Pragma': 'no-cache'
		});
		response.end();		
	},
	
	errorResponse : function(response, statusCode, body) {
		if(!response.headersSent){
			response.writeHead(statusCode, {
				'Content-Type' : 'text/plain',
				'Access-Control-Allow-Origin' : '*',
				'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
				'Pragma': 'no-cache'
			});
			response.end(body);
		}
	},

	errorFileNotFound : function(response) {
		this.errorResponse(response, 404, 'Not found!\n');
	},

	errorMissingParameter : function(response) {
		this.errorResponse(response, 400, 'Missing parameter\n');
	}
};

module.exports.BorhanBase = BorhanBase;
