var Url = require('url');
var fs = require('fs');

module.exports = {
	randomString: function(length) {
		var id = "";
		var characters = "abcdef0123456789";
		for (var i = 0; i < length; i++)  {
			id += characters.charAt(this.randomInt(0, characters.length));
		}
		return id;
	},
	randomInt: function(minimumValue, maximumValue) {
		return Math.floor(Math.random() * (maximumValue - minimumValue) ) + minimumValue;
	},
	getParameters: function(url) {
		return Url.parse(url, true).query;
	},
	getMethod(url) {
		return url.substring(url.indexOf("/method/") + "/method/".length, url.indexOf("?"));
	},
	getUrlFolders(url) {
		var addr = new Url.parse(url);
		return addr.pathname.split("/");
	},
	showInterface(response) {
		response.writeHead(200, {'Content-Type': 'text/html'});
		fs.readFile('./markup/index.html', (err, data) => {
			response.end(data);
		});
	}
}
