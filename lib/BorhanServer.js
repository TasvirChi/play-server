
var os = require('os');
var fs = require('fs');
var url = require('url');
var path = require('path');
var mime = require('mime');
var util = require('util');
var http = require('http');
var https = require('https');
var cluster = require('cluster');
var querystring = require('querystring');

var borhan = module.exports = require('./BorhanBase');

var BorhanServer = function(){
};
util.inherits(BorhanServer, borhan.BorhanBase);

BorhanServer.prototype.hostname = os.hostname();
BorhanServer.prototype.httpWebServer = null;
BorhanServer.prototype.httpsWebServer = null;
BorhanServer.prototype.processesToRestore = null;



BorhanServer.prototype.init = function() {
	this.startWebServers();
};

BorhanServer.prototype.startWebServers = function() {
    this.httpWebServer = http.createServer();
    
    if(BorhanConfig.config.cloud.httpsPort){
    	if(!BorhanConfig.config.cloud.keyFilePath || !BorhanConfig.config.cloud.certFilePath){
    		BorhanLogger.log('Unable to locate keyFilePath || certFilePath in the configuration file. Https listener will not be created');
    		return;
    	}
    	var keyFilePath = BorhanConfig.config.cloud.keyFilePath;
    	var certFielPath = BorhanConfig.config.cloud.certFilePath;
    	
    	var options = {
    			  key: fs.readFileSync(keyFilePath),
    			  cert: fs.readFileSync(certFielPath)
    	};
        
        this.httpsWebServer = https.createServer(options);
    }
};


var BorhanMainProcess = function(){
	BorhanLogger.log('\n\n_____________________________________________________________________________________________');
	BorhanLogger.log('Play-Server started'); // TODO add version
	
	this.init();
	this.run = true;
	this.childProcesses = {};

	cluster.setupMaster({
		args: [JSON.stringify(BorhanConfig.config)]
	});
	
	this.start();
	
	var This = this;
	
	cluster.on('listening', function(worker, address) {
		BorhanLogger.log('A process [' + worker.process.pid + '] is now connected');
		if(This.processesToRestore){
			var processes = This.processesToRestore;
			This.processesToRestore = null;
			This.restoreServerProcesses(processes);
		}		
	});
	process.on('SIGUSR1', function() {
		BorhanLogger.log('Got SIGUSR1. Invoke log rotate notification.');
		This.notifyLogsRotate();
	});
		
	BorhanConfig.watchFiles(function(){
		This.restart();
	});
};
util.inherits(BorhanMainProcess, BorhanServer);

BorhanMainProcess.prototype.start = function(){
	BorhanLogger.log('Starting all child processes');
	this.run = true;
	
	var numOfCores = os.cpus().length;
	var processes = [process.pid];
	for (var i = 0; i < numOfCores; i++) {
		var childProcess = this.spawn();
		processes.push(childProcess.process.pid);
		BorhanLogger.log('Started process [' + childProcess.process.pid + ']');
	}
	
	var serverProcessesKey = BorhanCache.getServerProcesses();
	var This = this;
	BorhanCache.get(serverProcessesKey, function(data){
		if(data){
			This.processesToRestore = data;
		}

		This.storeServerProcesses(processes);
	});
};

BorhanMainProcess.prototype.storeServerProcesses = function(processes){
	var serverProcessesKey = BorhanCache.getServerProcesses();
	
	BorhanCache.set(serverProcessesKey, processes, BorhanConfig.config.cache.serverProcess, function(){
		setInterval(function(){
			BorhanCache.set(serverProcessesKey, processes, BorhanConfig.config.cache.serverProcess);
		}, (BorhanConfig.config.cache.serverProcess - 5) * 1000);
	});
};

BorhanMainProcess.prototype.restoreServerProcesses = function(processes){
	BorhanLogger.log('restoring server processes');
	for(var i = 0; i < processes.length; i++){
		this.restoreServerProcess(processes[i]);
	}
};

BorhanMainProcess.prototype.restoreServerProcess = function(pid){
	var This = this;
	var processActionsKey = BorhanCache.getProcessActions(pid);
	BorhanCache.get(processActionsKey, function(actions){
		if(actions){
			This.restoreProcessActions(actions);
			BorhanCache.del(processActionsKey);
		}
	});
};

BorhanMainProcess.prototype.restoreProcessActions = function(actions){
	for(var actionId in actions){
		this.restoreAction(actions[actionId]);
	}
};

BorhanMainProcess.prototype.spawn = function(){
	var childProcess = cluster.fork();
	var This = this;
	childProcess.on('exit', function(code){
		This.onProcessExit(childProcess, code);
	});
	this.childProcesses[childProcess.process.pid] = childProcess;
	
	return childProcess;
};

BorhanMainProcess.prototype.onProcessExit = function(childProcess, code){
	var pid = childProcess.process.pid;
	delete this.childProcesses[pid];
	BorhanLogger.log('Process died [' + pid + '] , code [' + code + ']');
	
	if(this.run){
		var childProcess = this.spawn();
		BorhanLogger.log('Restarted process [' + childProcess.process.pid + ']');

		this.restoreServerProcess(pid);

		var processes = [];
		for (var pid in this.childProcesses) {
			processes.push(pid);
		}
		this.storeServerProcesses(processes);
	}
};

BorhanMainProcess.prototype.stop = function() {
	BorhanLogger.log('Stopping all child processes');
	this.run = false;
	for ( var pid in this.childProcesses) {
		this.childProcesses[pid].send('stop');
	}
};

BorhanMainProcess.prototype.restart = function() {
	BorhanLogger.log('Restarting all child processes');
	this.stop();
	this.start();
};

BorhanMainProcess.prototype.notifyLogsRotate = function() {
	BorhanLogger.log('Log rotate main process');
	BorhanLogger.notifyLogsRotate();
	for ( var pid in this.childProcesses) {
		BorhanLogger.log('Log rotate child process [' + pid + ']');
		this.childProcesses[pid].send('notifyLogsRotate');
	}
};

var BorhanChildProcess = function(){
	process.on('uncaughtException', function (err) {
	    BorhanLogger.error('Uncaught Exception: ' + err.stack);
	}); 

	var This = this;
	process.on('message', function(action) {
		if(typeof This[action] === 'function'){
			This[action].apply(This);
		}
	});
	  
	this.init();
	this.managers = {};
	this.start();
};
util.inherits(BorhanChildProcess, BorhanServer);

BorhanChildProcess.prototype.start = function(){
	this.startHttpServer();
	if(this.httpsWebServer){
		this.startHttpsServer();
	}
};

BorhanChildProcess.prototype.startHttpServer = function() {
	var httpPort = BorhanConfig.config.cloud.httpPort;
	BorhanLogger.log('Listening on port [' + httpPort + ']');
	var This = this;
	this.httpWebServer.on('request', function(request, response) {
		return This.handleRequest(request, response);
	});
	this.httpWebServer.listen(httpPort);
};

BorhanChildProcess.prototype.startHttpsServer = function() {
	var httpsPort = BorhanConfig.config.cloud.httpsPort;
	
	BorhanLogger.log('Listening on port [' + httpsPort + ']');
	var This = this;
	this.httpsWebServer.addListener('request', function(request, response) {
		return This.handleRequest(request, response);
	});
	this.httpsWebServer.listen(httpsPort);
};

BorhanChildProcess.prototype.stop = function(){
	for(var serviceName in this.managers){
		var service = this.managers[serviceName];
		BorhanLogger.log('Stopping service [' + serviceName + ']');
		service.stop();
	}
};

BorhanChildProcess.prototype.notifyLogsRotate = function(){
	BorhanLogger.notifyLogsRotate();
};

BorhanChildProcess.prototype.parseUrl = function(urlInfo) {
	var pathParts = urlInfo.pathname.split('/');
	if(pathParts.length < 5)
		return null;

	urlInfo.service = pathParts[3][0].toUpperCase() + pathParts[3].substr(1);
	urlInfo.action = pathParts[4];
	urlInfo.params = querystring.parse(urlInfo.query);
	urlInfo.params.partnerId = pathParts[2];
	
	var paramName = null;
	for(var i = 5; i < pathParts.length; i++){
		if(paramName == null){
			paramName = pathParts[i];
		}
		else{
			urlInfo.params[paramName] = pathParts[i];
			paramName = null;
		}
	}
	
	return urlInfo;
};

BorhanChildProcess.prototype.handleRequest = function(request, response) {
	BorhanLogger.access(request, response);
	
	var urlInfo = url.parse(request.url);
	var requestInfo = this.parseUrl(urlInfo);
	if(!requestInfo){
		var filePath = path.join(__dirname, 'web', urlInfo.pathname);
		var stat = fs.statSync(filePath);
		if(stat && stat.isFile()){
			response.writeHead(200, {
		        'Content-Type': mime.lookup(filePath),
		        'Content-Length': stat.size
		    });

		    var readStream = fs.createReadStream(filePath);
		    return readStream.pipe(response);
		}
			
		response.error('Failed to parse request');
		return this.errorFileNotFound(response);
	}

    var service = this.managers[requestInfo.service];
	if(!service){	
		var serviceClass = 'Borhan' + requestInfo.service + 'Manager';
		var serviceModule = './managers/' + serviceClass;
		try{
			var module = require(serviceModule);
			service = new module[serviceClass]();
		}
		catch(err){
			response.error(err.stack);
			return this.errorFileNotFound(response);
		}

		if(!service){
			response.error('Service [' + requestInfo.service + '] not found');
			return this.errorFileNotFound(response);
		}
		
		service.start();
		this.managers[requestInfo.service] = service;
	}
			
	if(!service[requestInfo.action] || !(typeof service[requestInfo.action] === 'function')){
		response.error('Action [' + requestInfo.service + '.' + requestInfo.action + '] not found');
		return this.errorFileNotFound(response);
	}

	try{
		service[requestInfo.action].apply(service, [request, response, requestInfo.params]);
	}
	catch(err){
		response.error(err.stack);
		return this.errorResponse(response, 500, err.message);
	}
};

module.exports.BorhanMainProcess = BorhanMainProcess;
module.exports.BorhanChildProcess = BorhanChildProcess;