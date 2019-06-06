var Player = require("./player.js");

module.exports = class PlayersList {
	constructor() {
		this.players = [];
	}
	newPlayer(access_token) {
		let info = global.musthave.Users.getInfo(access_token);
		let player = new Player(info);
		this.players.push(player);
		return player;
	}
	getPlayerById(id) {
		for (let i = 0; i < this.players.length; i++) {
			if (this.players[i].id == id) return this.players[i];
		} 
	}
	toJson() {
		let object = [];
		for (let i = 0; i < this.players.length; i++) {
			object.push(this.players[i].toJson());
		}
		return object;
	}
	getPlayersCount() {
		return this.players.length;
	}
}
