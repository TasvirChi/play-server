
var os = require('os');
var fs = require('fs');
var util = require('util');

var borhan = {
	client: require('../client/BorhanClient')
};

BorhanLogger = {
	config: null,
	hostname: os.hostname(),
	debugEnabled: false,
	largeDataDebugEnabled: false,
	accessLogFile: null,
	logFile: null,
	errorFile: null,

	accessRequestHeaders: ['referrer', 'user-agent', 'x-borhan-f5-https', 'host', 'x-forwarded-for', 'x-forwarded-server', 'x-forwarded-host'],
	accessResponseHeaders: ['content-range', 'cache-control', 'x-borhan-session'],

	init: function(){
		if(!BorhanConfig.config.logger || BorhanLogger.config)
			return;

		BorhanLogger.config = BorhanConfig.config.logger;
		
		if(BorhanLogger.config.debugEnabled){
			BorhanLogger.debugEnabled = parseInt(BorhanLogger.config.debugEnabled);
		}
		if(BorhanLogger.config.largeDataDebugEnabled){
			BorhanLogger.largeDataDebugEnabled = parseInt(BorhanLogger.config.largeDataDebugEnabled);
		}
		if(BorhanLogger.config.accessRequestHeaders){
			BorhanLogger.accessRequestHeaders = BorhanLogger.config.accessRequestHeaders.split(',');
		}
		if(BorhanLogger.config.accessResponseHeaders){
			BorhanLogger.accessResponseHeaders = BorhanLogger.config.accessResponseHeaders.split(',');
		}
		
		if(BorhanLogger.config.accessLogName){
			BorhanLogger.accessLogFile = fs.openSync(BorhanLogger.config.logDir + '/' + BorhanLogger.config.accessLogName, 'a');		
		}
		
		if(BorhanLogger.config.logName){
			BorhanLogger.logFile = fs.openSync(BorhanLogger.config.logDir + '/' + BorhanLogger.config.logName, 'a');
		}
		
		if(BorhanLogger.config.errorLogName){
			BorhanLogger.errorFile = fs.openSync(BorhanLogger.config.logDir + '/' + BorhanLogger.config.errorLogName, 'a');			
		}
	},
	
	notifyLogsRotate: function(){
		if(BorhanLogger.config.accessLogName){
			var newAccessLogHandler = fs.openSync(BorhanLogger.config.logDir + '/' + BorhanLogger.config.accessLogName, 'a');
			var oldAccessLogHandler = BorhanLogger.accessLogFile;
			BorhanLogger.accessLogFile = newAccessLogHandler;
			fs.closeSync(oldAccessLogHandler);				
		}
		if(BorhanLogger.config.logName){
			var newLogHandler = fs.openSync(BorhanLogger.config.logDir + '/' + BorhanLogger.config.logName, 'a');
			var oldLogHandler = BorhanLogger.logFile;
			BorhanLogger.logFile = newLogHandler;
			fs.closeSync(oldLogHandler);			
		}
		if(BorhanLogger.config.errorLogName){
			var newErrorLogHandler = fs.openSync(BorhanLogger.config.logDir + '/' + BorhanLogger.config.errorLogName, 'a');
			var oldErrorLogHandler = BorhanLogger.errorFile;
			BorhanLogger.errorFile = newErrorLogHandler;
			fs.closeSync(oldErrorLogHandler);			
		}
	},
	
	getDateTime: function () {
	    var date = new Date();

	    var hour = date.getHours();
	    hour = (hour < 10 ? "0" : "") + hour;

	    var min  = date.getMinutes();
	    min = (min < 10 ? "0" : "") + min;

	    var sec  = date.getSeconds();
	    sec = (sec < 10 ? "0" : "") + sec;
	    
	    var millisec = date.getMilliseconds();

	    var year = date.getFullYear();

	    var month = date.getMonth() + 1;
	    month = (month < 10 ? "0" : "") + month;

	    var day  = date.getDate();
	    day = (day < 10 ? "0" : "") + day;

	    return year + "/" + month + "/" + day + " " + hour + ":" + min + ":" + sec + "." + millisec;
	},
	
	prefix: function(stackSource){
		var time = BorhanLogger.getDateTime();
		
		if(!stackSource)
			stackSource = new Error();
		var stack = stackSource.stack.split('\n');
		var stackLevel = 3;
		var line = stack[stackLevel].trim().split(' ');
		line = line[1];
		if(line.startsWith('Object.'))
			line = line.substr(7);
		else if(line.indexOf('/') > 0)
			line = line.substr(line.lastIndexOf('/') + 1);
		else if(line.indexOf('\\') > 0)
			line = line.substr(line.lastIndexOf('\\') + 1);
		
		return '[' + process.pid + '][' + time + '][' + line + ']';
	},
	
	write: function(str){
		if(BorhanLogger.logFile){
			fs.writeSync(BorhanLogger.logFile, str + '\n');
		}
		else{
			console.log(str);
		}
	},
	
	writeError: function(str){
		this.write(str);
		if(BorhanLogger.errorFile){
			fs.writeSync(BorhanLogger.errorFile, str + '\n');
		}
		else{
			console.error(str);
		}
	},
	
	debug: function(str, stackSource){
		if(BorhanLogger.debugEnabled){
			BorhanLogger.write(BorhanLogger.prefix(stackSource) + ' DEBUG: ' + str);
		}
	},
	
	log: function(str, stackSource){
		BorhanLogger.write(BorhanLogger.prefix(stackSource) + ' INFO: ' + str);
	},
	
	warn: function(str, stackSource){
		BorhanLogger.writeError(BorhanLogger.prefix(stackSource) + ' WARN: ' + str);
	},
	
	error: function(str, stackSource){
		BorhanLogger.writeError(BorhanLogger.prefix(stackSource) + ' ERROR: ' + str);
	},
	
	dir: function(object, stackSource, prefix){
		BorhanLogger.write(BorhanLogger.prefix(stackSource) + ' INFO: ' + (prefix ? prefix : '') + util.inspect(object, { showHidden: true, depth: null }));
	},

	quoteVar: function(val) {
		if (!val) {
			return '-';
		}

		return '"' + val + '"';
	},
	
	access: function(request, response){
		var startTime = new Date().getTime();
		response.requestId = BorhanUtils.getUniqueId();

		var timeout = setTimeout(function(){
			response.writeHead(408, {
				'Content-Type' : 'text/plain',
				'Access-Control-Allow-Origin' : '*'
			});
			response.end('Request Timeout!');
		}, BorhanConfig.config.cloud.requestTimeout * 1000);
		
		if(request.headers['x-forwarded-for']){
			var forwardeds = request.headers['x-forwarded-for'].split(',');
			request.ip = forwardeds[0].trim();
		}
		else{
			request.ip = request.connection.remoteAddress || 
			request.socket.remoteAddress ||
			request.connection.socket.remoteAddress;
		}
		
		var getStack = function(){
			return new Error();
		};
		
		response.log = function(msg){
			BorhanLogger.log('Request [' + response.requestId + '] ' + msg, getStack());
		};
		response.dir = function(object){
			BorhanLogger.dir(object, getStack(), 'Request [' + response.requestId + '] ');
		};
		response.error = function(msg){
			BorhanLogger.error('Request [' + response.requestId + '] ' + msg, getStack());
		};
		response.debug = function(msg){
			BorhanLogger.debug('Request [' + response.requestId + '] ' + msg, getStack());
		};

		var savedHeaders = {};
		var responseWriteHead = response.writeHead;
		response.writeHead = function (statusCode, reasonPhrase, headers) {		
			for (var i = 0; i < BorhanLogger.accessResponseHeaders.length; i++) {
				var curHeader = BorhanLogger.accessResponseHeaders[i];
				savedHeaders[curHeader] = response.getHeader(curHeader);
				if (headers && headers[curHeader])
					savedHeaders[curHeader] = headers[curHeader];
			}
			
			// call the original
			responseWriteHead.apply(response, [statusCode, reasonPhrase, headers]);
		};
		
		var responseEnd = response.end;
		response.end = function(body){
			clearTimeout(timeout);
			var executionTime = (new Date().getTime()) - startTime;
			var logLine = request.ip + ' ' + BorhanLogger.getDateTime() + ' "' + request.method + ' ' + request.url + ' HTTP/' + request.httpVersion + '" ' + response.statusCode;
			logLine += ' ' + Math.floor(executionTime / 1000) + '/' + (executionTime * 1000);

			// add the request headers
			for (var i = 0; i < BorhanLogger.accessRequestHeaders.length; i++) {
				var curHeader = BorhanLogger.accessRequestHeaders[i];
				logLine += ' ' + BorhanLogger.quoteVar(request.headers[curHeader]);
			}

			// add the response headers
			for (var i = 0; i < BorhanLogger.accessResponseHeaders.length; i++) {
				var curHeader = BorhanLogger.accessResponseHeaders[i];
				if (!savedHeaders[curHeader] && response.getHeader(curHeader))
					logLine += ' ' + BorhanLogger.quoteVar(response.getHeader(curHeader));
				else
					logLine += ' ' + BorhanLogger.quoteVar(savedHeaders[curHeader]);
			}

			if(BorhanLogger.accessLogFile){
				fs.writeSync(BorhanLogger.accessLogFile, logLine + '\n');
			}

			BorhanLogger.write('ACCESS: ' + logLine);
//			if(response.statusCode != 200){
//				logLine += ' ' + body;
//				BorhanLogger.writeError('ACCESS: ' + logLine, false);
//			}
			responseEnd.apply(response, [body]);
		};
		
		response.log(request.url);
	    
		response.setHeader("X-Me", BorhanLogger.hostname);
		response.setHeader("X-Borhan-Session", response.requestId);
	}
};

BorhanLogger.init();

util.inherits(BorhanLogger, borhan.client.IBorhanLogger);
