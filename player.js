var playerCounter = 0;

module.exports = class Player {
	constructor() {
		this.id = playerCounter;
		playerCounter++;
	}
	getId() {
		return this.id;
	}
}