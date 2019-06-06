var AStar = require("./astar.js");
var utils = require("./utils.js");

var attack_config = require("./file_loader.js").loadJson("./config/units.json");
var move_config = require("./file_loader.js").loadJson("./config/move_types.json");

module.exports = class Unit {
	constructor(x, y, type, owner) {
		this.setPosition(x, y);
		this.type = type;
		this.owner = owner;
		this.health = 3;
		this.killed = false;
		this.id = utils.randomString(16);
	}
	setOwner(owner) {
		this.owner = owner;
	}
	setPosition(x, y) {
		this.x = x;
		this.y = y;
	}
	attack(target) {
		let counter = new AStar();
		counter.setStart(this.x, this.y);
		counter.setEnd(target.x, target.y);
		counter.setPrices(move_config.default);
		let cost = counter.calculateMinimalCost();
		if (cost < attack_config[this.type].shot_distance) {
			this.fight(target);
		}
		return {
			my_health: this.health,
			target_health: target.health
		}
	}
	fight(target) {
		if (utils.returnTrueWithProbability(attack_config[this.type].attack[target.type])) {
			target.damage();
		}
		if (utils.returnTrueWithProbability(attack_config[this.type].counter_attack[target.type])) {
			this.damage();
		}
	}
	damage() {
		if (this.health > 0) {
			this.health--;
		} else {
			this.health = 0;
			this.killed = true;
		}
		return this.health;
	}
	heal() {
		if (this.health < 3)
			this.health ++;
		return this.health;
	}
	moveTo(x, y) {
		let counter = new AStar();
		counter.setStart(this.x, this.y);
		counter.setEnd(x, y);
		counter.setPrices(move_config[attack_config[this.type].moveType]);
		let cost = counter.calculateMinimalCost();
		if (cost < attack_config[this.type].canMove) {
			this.setPosition(x, y);
			return true;
		}
		return false;
	}
}
