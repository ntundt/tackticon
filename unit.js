module.exports = class Unit {
	constructor(x, y, type, owner) {
		this.x = x;
		this.y = y;
		this.type = type;
		this.owner = owner;
	}
	setOwner(owner) {
		this.owner = owner;
	}
	attack(target) {

	}
	move(x, y) {
		
	}
}