var GameMap = require("./map.js");
var PlayersList = require("./players_list.js");
var Utils = require("./utils.js");

module.exports = class Game {
	constructor(options) {
		this.id = Utils.randomString(40);
		this.map = new GameMap(options.map);
		this.players_count = options.players_count;
		this.players = new PlayersList();
	}
	newPlayer() {
		var player = this.players.newPlayer();
		return player.id;
	}
}