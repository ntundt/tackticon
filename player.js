var utils = require("./utils.js");

var playerCounter = 0;

module.exports = class Player {
	constructor() {
		this.id = playerCounter;
		this.token = utils.randomString(40);
		playerCounter++;
	}
	getId() {
		return this.id;
	}
	getToken() {
		return this.token;
	}
	toJson() {
		return {
			id: this.id,
			nick: this.nickname
		}
	}
	setNickname(nickname) {
		this.nickname = nickname;
	}
}
