var GameMap = require("./map.js");

module.exports = class Game {
	constructor(options) {
		this.id = this.generateId(16);
		this.map = new GameMap(options.map);
	}
	randomInt(min, max) {
		return Math.floor(Math.random() * (max - min) ) + min;
	}
	generateId(length) {
		var id = "";
		var characters = "abcdef0123456789";
		for (var i = 0; i < length; i++)  {
			id += characters.charAt(this.randomInt(0, characters.length));
		}
		return id;
	}
}