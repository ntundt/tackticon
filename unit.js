var AStar = require("./astar.js");
var utils = require("./utils.js")

module.exports = class Unit {
	constructor(x, y, type, owner) {
		this.x = x;
		this.y = y;
		this.type = type;
		this.owner = owner;
		this.id = utils.randomString(16);
	}
	setOwner(owner) {
		this.owner = owner;
	}
	attack(target) {
		let counter = new AStar({"g":1,"r":1,"w":1,"c":1});
		counter.setStart(this.x, this.y);
		counter.setEnd(target.x, target.y);
		counter.setPrices();
		let cost = counter.calculateMinimalCost();
		if (cost < attackConfig) {

		}
	}
	moveTo(x, y) {

	}
}