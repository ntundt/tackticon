var Game = require("./game.js");
var fs = require("fs");

module.exports = class GamesList {
	constructor() {
		this.list = [];
	}
	startNewGame(options) {
		var game = new Game(options);
		this.list.push(game);
		return game;
	}
	addGame(game) {

	}
	importExistingGames() {
		var games_files_list = fs.readdirSync("./games/");
		for (var i = 0; i < games_files_list.length; i++) {
			var game = JSON.parse(fs.readSync("./games/" + games_files_list[i]));
			this.addGame(game);
		}
	}
	saveAll(callback) {
		for (var i = 0; i < this.list.length; i++) {
			this.list[i].saveItself((i == this.list.length - 1?callback:function(){}));
		}
	}
	getGameById(id) {
		for (var i = 0; i < this.list.length; i++) {
			if (this.list[i].getId() == id) {
				return this.list[i];
			}
		}
	}
	toJsonString() {
		var object = [];
		for (var i = 0; i < this.list.length; i++) {
			object.push({game_id: this.list[i].id, players: this.list[i].getPlayers()});
		}
		return object;
	}
}
