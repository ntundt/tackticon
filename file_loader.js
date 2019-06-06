var fs = require("fs");

var loadJson = function(name) {
	return JSON.parse(fs.readFileSync(name).toString());
}

module.exports = {
	loadJson
}
