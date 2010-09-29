var net = require('net');
var enterprise = require('../enterprise/enterprise.js');
enterprise.setup({AppName: 'irc.js', Version: '0.0.000.1', Exceptions: {Handle: true, DieOnUncaughtException: false}, Log: {Console: true, File: false}}); 
var log = enterprise.log;

var config = {NetworkName: 'RelayRace', PortNumber: 3918};

net.createServer(function (socket) { 
	log("Client connected");
	
	socket.setEncoding("utf8");
	socket.write("200");
	
	socket.on("data", dataClick);
	
	socket.on("end", function () { 
		socket.end();
		log("Client disconnected");
	});
}).listen(config.PortNumber);

log(' - Server listening on port: ' + config.PortNumber);

function dataClick(data) {
	handleData(data).exec();
}

function handleData(data) {
	log('> Processing: ' + data);
	data = new String(data);
	data = data.split('\n', 2);
	for (var i = 0; i < data.length; i++) {
		var lineData = new String(data[i]);
		var command = lineData.slice(0, lineData.indexOf(' ', 0));
		var param = lineData.slice(lineData.indexOf(' ', 0), -1);
		switch (command) {
			case 'NICK':
				log(' - Nickname change request');
				handlerIRC_NICK(param)
			break;
			
			case 'USER':
				log(' - User information sent');
			break;
				
			default:
				log(' - Unknown Command');
			break;
		}
	}
}

function handleIRC_NICK(data) {
	log('-> Data: ' + data);
}
