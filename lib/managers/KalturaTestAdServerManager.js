var util = require('util');

var borhan = module.exports = require('../BorhanManager');

/**
 * @service testAdServer
 */
var BorhanTestAdServerManager = function(){
	this.vastPool = [];
	if(BorhanConfig.config.testAdServer.vastUrls){
		this.vastPool = BorhanConfig.config.testAdServer.vastUrls.split(',');
	}
};
util.inherits(BorhanTestAdServerManager, borhan.BorhanManager);

/**
 * Dummy ad server
 * 
 * @action getVast.
 * 
 * @param eventType
 */
BorhanTestAdServerManager.prototype.getVast = function(request, response, params){
	response.dir(params);
	if(this.vastPool.length == 0){
		response.end('Vast pool is empty');
		return;
	}
	var randomAdId = Math.floor(Math.random()*this.vastPool.length);
	var This = this;
	var vastUrl = this.vastPool[randomAdId];
	BorhanLogger.log('selected vast url: ' + vastUrl);
	this.getHttpUrl(vastUrl, null, function(vastContent){
		response.log('handled');
		This.okResponse(response, vastContent, 'text/xml');		
		},function (err) {
			response.end('Not found');
	});
};

/**
 * Dummy ad server
 * 
 * @action trackBeacon.
 * 
 * @param eventType
 */
BorhanTestAdServerManager.prototype.trackBeacon = function(request, response, params){
	response.log('Handled beacon');
	response.dir(params);
	response.writeHead(200);
	response.end('OK');
};

module.exports.BorhanTestAdServerManager = BorhanTestAdServerManager;
