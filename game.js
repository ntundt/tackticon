var fs = require("fs");

var GameMap = require("./map.js");
var PlayersList = require("./players_list.js");
var Utils = require("./utils.js");

module.exports = class Game {
	constructor(options) {
		this.id = Utils.randomString(40);
		this.map = new GameMap(options.mapOptions);
		this.players = new PlayersList();
	}
	newPlayer() {
		var player = this.players.newPlayer();
		return player;
	}
	saveItself(callback=function(){}) {
		var filename = this.id + ".sav";
		var object = {
			players: this.getPlayers()
		};
		callback();
	}
	connect(nickname) {
		var player = this.newPlayer();
		player.setNickname(nickname);
		return player;
	}
	toJson() {
		return JSON.stringify({
			game_id: this.id,
			players: this.getPlayers()
		});
	}
	getPlayersCount() {
		return this.players.getPlayersCount();
	}
	getPlayers() {
		return this.players.toJson();
	}
	getId() {
		return this.id;
	}
}
