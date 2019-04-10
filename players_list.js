var Player = require("./player.js");

module.exports = class PlayersList {
	constructor() {
		this.players = [];
	}
	addPlayer() {
		var player = new Player();
		this.players.push(player);
		return player.getId();
	}
}