module.exports = new (class Logger {
	log(message) {
		var date = new Date();
		console.log(
			"[" + date.getDate() + "." + date.getMonth() + "." 
			+ date.getFullYear() + " " + date.getHours() + ":" 
			+ date.getMinutes() + ":" + date.getSeconds() + "] " + message
		);
	}
});
