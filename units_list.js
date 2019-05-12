module.exports = class UnitList {
	constructor() {
		this.list = [];
	}
	addUnit(x, y, type, owner) {
		this.list.push(new Unit(x, y, type, owner));
	}
	heal(id) {
		try {
			return this.getUnitById(id).heal();
		} catch (e) {
			return false;
		}
	}
	getUnitById(id) {
		for (let i = 0; i < this.list.length; i++) {
			if (this.list[i].id == id) {
				return this.list[i];
			}
		}
		return false;
	}
}