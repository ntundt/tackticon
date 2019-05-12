var fs = require("fs");

var GameMap = require("./map.js");
var PlayersList = require("./players_list.js");
var Utils = require("./utils.js");
var UnitsList = require("./units_list.js");

module.exports = class Game {
	constructor(options) {
		this.id = Utils.randomString(40);
		this.map = new GameMap(options.mapOptions);
		this.players = new PlayersList();
		this.units_list = new UnitsList();
		this.loadConfig(options.config);
	}
	loadConfig(configName) {
		this.config = JSON.parse(fs.readFileSync("config/" + configName).toString());
	}
	newPlayer() {
		var player = this.players.newPlayer();
		return player;
	}
	saveItself(callback=function(){}) {
		var filename = this.id + ".sav";
		var object = {
			id: this.id,
			players: this.getPlayers(),
			map: this.id + ".map"
		};
		this.map.saveItself(this.id + ".map");
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
