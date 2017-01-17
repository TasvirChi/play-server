var util = require('util');

var borhan = module.exports = require('../BorhanManager');

/**
 * @service system
 */
var BorhanSystemManager = function(){};
util.inherits(BorhanSystemManager, borhan.BorhanManager);

/**
 * check if server is up
 * 
 * @action ping.
 * 
 */
BorhanSystemManager.prototype.ping = function(request, response, params){
	return this.okResponse(response, 'OK', 'text/plain');			
};


module.exports.BorhanSystemManager = BorhanSystemManager;
