
var cluster = require('cluster');
var borhan = require('./lib/BorhanServer');

var BorhanProcess = null;

if (cluster.isMaster) {
	BorhanProcess = new borhan.BorhanMainProcess();
}
else{
	BorhanProcess = new borhan.BorhanChildProcess();
}

