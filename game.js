var fs = require("fs");

var GameMap = require("./map.js");
var PlayersList = require("./players_list.js");
var Utils = require("./utils.js");

module.exports = class Game {
	constructor(options) {
		this.id = Utils.randomString(40);
		// this.map = new GameMap(options.map);
		this.players = new PlayersList();
	}
	newPlayer() {
		var player = this.players.newPlayer();
		return player;
	}
	save(callback) {
		var object = {};
		callback();
	}
	connect(nickname) {
		var player = this.newPlayer();
		player.setNickname(nickname);
		return player;
	}
	toJsonString() {
		return JSON.stringify({
			game_id: this.id,
			players: this.getPlayers()
		});
	}
	getPlayersCount() {
		return this.players.getPlayersCount();
	}
	getPlayers() {
		return this.players.toJsonString();
	}
	getId() {
		return this.id;
	}
}
