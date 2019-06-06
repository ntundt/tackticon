module.exports = new (class Logger {
	constructor() {
		this.debugIsEnabled = false;
	}
	enableDebug() {
		this.debugIsEnabled = true;
	}
	disableDebug() {
		this.debugIsEnabled = false;
	}
	log(message) {
		var date = new Date();
		console.log(
			"[" + date.getDate() + "." + date.getMonth() + "." 
			+ date.getFullYear() + " " + date.getHours() + ":" 
			+ date.getMinutes() + ":" + date.getSeconds() + "] " + message
		);
	}
	debug(message) {
		if (this.debugIsEnabled) {
			var date = new Date();
			console.log(
				"\x1b[34m%s\x1b[0m",
				"[" + date.getDate() + "." + date.getMonth() + "." 
				+ date.getFullYear() + " " + date.getHours() + ":" 
				+ date.getMinutes() + ":" + date.getSeconds() + "] " + message
			);
		}
	}
})();
