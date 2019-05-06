var fs = require("fs");
var Node = require("./node.js");

module.exports = class GameMap {
	constructor(map) {
		this.map_object = [];
		if (typeof map == 'string') {
			this.loadMap(map);
		} else {
			this.randomMap();
		}
	}
	loadMap(map) {
		this.terrain = [];
		this.cities = [];
		this.units = [];

		var stringifiedMap = fs.readFileSync("maps/" + map).toString();
		stringifiedMap = stringifiedMap.split("\n");
		
		for (var i = 0; i < stringifiedMap.length; i++) {
			this.terrain.push([]);
			for (var j = 0; j < stringifiedMap[i].length; j++) {
				this.terrain[i][j] = new Node(i, j, stringifiedMap[i].charAt(j));
			}
		}
	}
	getXSize() {
		return this.terrain.length;
	}
	getYSize() {
		return this.terrain[0].length;
	}
	getNode(x, y) {
		return this.terrain[x][y];
	}
	nodeExists(x, y) {
		if (x < 0 || y < 0)
			return false;
		try {
			return (this.terrain[x][y] !== undefined);
		} catch (e) {
			return false;
		}
	}
	getAdjacentNodes(x, y) {
		var list = [];
		if (this.nodeExists(x-1, y-1)) list.push({ node: this.getNode(x-1, y-1), costMultiplier: Math.SQRT2 });
		if (this.nodeExists(x-1, y)) list.push({ node: this.getNode(x-1, y), costMultiplier: 1 });
		if (this.nodeExists(x-1, y+1)) list.push({ node: this.getNode(x-1, y+1), costMultiplier: Math.SQRT2 });
		if (this.nodeExists(x, y-1)) list.push({ node: this.getNode(x, y-1), costMultiplier: 1 });
		if (this.nodeExists(x, y+1)) list.push({ node: this.getNode(x, y+1), costMultiplier: 1 });
		if (this.nodeExists(x+1, y-1)) list.push({ node: this.getNode(x+1, y-1), costMultiplier: Math.SQRT2 });
		if (this.nodeExists(x+1, y)) list.push({ node: this.getNode(x+1, y), costMultiplier: 1 });
		if (this.nodeExists(x+1, y+1)) list.push({ node: this.getNode(x+1, y+1), costMultiplier: Math.SQRT2 });

		return list;
		// return [
		// 	{ node: this.getNode(x-1, y-1), costMultiplier: Math.SQRT2 },
		// 	{ node: this.getNode(x-1, y), costMultiplier: 1 },
		// 	{ node: this.getNode(x-1, y+1), costMultiplier: Math.SQRT2 },
		// 	{ node: this.getNode(x, y-1), costMultiplier: 1 },
		// 	{ node: this.getNode(x, y+1), costMultiplier: 1 },
		// 	{ node: this.getNode(x+1, y-1), costMultiplier: Math.SQRT2 },
		// 	{ node: this.getNode(x+1, y), costMultiplier: 1 },
		// 	{ node: this.getNode(x+1, y+1), costMultiplier: Math.SQRT2 }
		// ];
	}
	getPreview() {

	}
	randomMap() {
		
	}
}
