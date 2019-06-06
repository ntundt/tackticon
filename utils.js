var Url = require('url');
var fs = require('fs');

var randomString = function(length) {
	var id = "";
	var characters = "abcdef0123456789";
	for (var i = 0; i < length; i++)  {
		id += characters.charAt(this.randomInt(0, characters.length));
	}
	return id;
}

var randomInt = function(minimumValue, maximumValue) {
	return Math.floor(Math.random() * (maximumValue - minimumValue) ) + minimumValue;
}

var returnTrueWithProbability = function(probability) {
	return randomInt(0, 100) <= probability;
}

var getParameters = function(url) {
	return Url.parse(url, true).query;
}

var getMethod = function(url) {
	return url.substring(url.indexOf("/method/") + "/method/".length, url.indexOf("?"));
}

var getUrlFolders = function(url) {
	var addr = new Url.parse(url);
	return addr.pathname.split("/");
}

var showInterface = function(response) {
	response.writeHead(200, {'Content-Type': 'text/html'});
	fs.readFile('./markup/index.html', (err, data) => {
		response.end(data);
	});
}

module.exports = {
	randomString,
	randomInt,
	returnTrueWithProbability,
	getParameters,
	getMethod,
	getUrlFolders,
	showInterface
}
