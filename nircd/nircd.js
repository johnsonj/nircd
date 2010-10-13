var net = require('net');
var enterprise = require('../enterprise/enterprise.js');
enterprise.setup({AppName: 'irc.js', Version: '0.0.000.1', Exceptions: {Handle: true, DieOnUncaughtException: false}, Log: {Console: true, File: false}}); 
var log = enterprise.log;
global.log = log;

var config = {NetworkName: 'RelayRace', PortNumber: 3918};

net.createServer(function (socket) { 
	log("Client connected");
	
	socket.setEncoding("utf8");
	socket.write("200");
	user = require('./userman.js');
	user.init(socket);
	
	socket.on("data", function dataClick(data) {
		log('> Processing: ' + data);
		data = new String(data);
		data = data.split('\n', 2);
		for (var i = 0; i < data.length; i++) {
			var lineData = new String(data[i]);
			var command = lineData.slice(0, lineData.indexOf(' ', 0));
			var parameters = lineData.slice(lineData.indexOf(' ', 0) + 1, -1);
			var personalCommandObject = {cmd: command, param: parameters};
			switch (command) {
				case 'NICK':
				case 'USER':
					user.personalCommand(personalCommandObject);
				break;
					
				default:
					log(' - Unknown Command');
				break;
			};
		}
	});
	
	
	socket.on("end", function () { 
		socket.end();
		log("Client disconnected");
	});
}).listen(config.PortNumber);

log(' - Server listening on port: ' + config.PortNumber);



function handleIRC_NICK(data) {
	log('-> Data: ' + data);
}
