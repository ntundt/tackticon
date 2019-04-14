var Player = require("./player.js");

module.exports = class PlayersList {
	constructor() {
		this.players = [];
	}
	newPlayer(nickname) {
		var player = new Player();
		this.players.push(player);
		player.setNickname(nickname);
		return player;
	}
	getPlayerById(id) {
		for (var i = 0; i < this.players.length; i++) {
			if (this.players[i].id == id) return this.players[i];
		} 
	}
	toJson() {
		var object = [];
		for (var i = 0; i < this.players.length; i++) {
			object.push(this.players[i].toJson());
		}
		return object;
	}
	getPlayersCount() {
		return this.players.length;
	}
}
