////////////////////////////////
// enterprise.js
////////////////////////////////


(function() {
	var mergeJSON = function(a, b) { for(var d in b) { a[d] = b[d] } return a; }
	var config = {AppName: 'None', Version: '0.00.000.00'};
	config['Exceptions'] = {Handle: false, FailOnException: true};
	config['Log'] = {Console: false, File: false}
		
	exports.setup = function(userConfig) {
		config = mergeJSON(config, userConfig);
		exceptions.state(config.Exceptions);
	}

	exports.log = function(msg) {
		if (config.Log.Console)
			console.log(msg);
	}

	var exceptions = {enabled: config.Exceptions.Handle};

	exceptions.handleUncaughtException = function (err) {
		console.log('- ' + config.AppName + '[' + config.Version + '] ------------------------');
		console.log('- ERROR: ' + err.Message + ' ['+err.errno+']');
		console.log('Filename: ' + __filename);
		console.log('Syscall: ' + err.syscall);
		console.log('Stack trace: ' + err.stack);

		if (config.Exceptions.FailOnException) {
			process.exit();
		}
	}

	exceptions.state = function (enabled) {
		process.removeListener('uncaughtException', exceptions.handleUncaughtException);
		if (enabled)
			process.on('uncaughtException', exceptions.handleUncaughtException);
	}
})();
