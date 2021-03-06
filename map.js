var fs = require("fs");

var Node = require("./node.js");

var consts = require("./enum.js");

module.exports = class GameMap {
	constructor(options) {
		this.map_object = [];
		if (typeof options.mapName == 'string') {
			this.loadMap(options.mapName);
		} else if (options.mapName == consts.MAP_RANDOM) {
			this.randomMap();
		}
	}
	getStringifiedMap() {
		let stringifiedMap = "";
		for (let i = 0; i < this.terrain.length; i++) {
			for (let j = 0; j < this.terrain[i].length; j++) {
				stringifiedMap += this.terrain[i][j].type;
			}
			if (i != this.terrain.length - 1) stringifiedMap += "\n";
		}
		return stringifiedMap;
	}
	loadMap(map) {
		this.terrain = [];
		this.cities = [];
		this.units = [];

		var stringifiedMap = fs.readFileSync("maps/" + map + ".map").toString();
		this.map_string = stringifiedMap;
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
	toJson() {
		return {
			terrain: this.terrain,
			x_size: this.getXSize(),
			y_size: this.getYSize()
		}
	}
	getAdjacentNodes(x, y) {
		var list = [];
		if (this.nodeExists(x-1, y-1)) list.push({ node: this.getNode(x-1, y-1), costMultiplier: Math.SQRT2 });
		if (this.nodeExists(x-1, y  )) list.push({ node: this.getNode(x-1, y  ), costMultiplier: 1 });
		if (this.nodeExists(x-1, y+1)) list.push({ node: this.getNode(x-1, y+1), costMultiplier: Math.SQRT2 });
		if (this.nodeExists(x  , y-1)) list.push({ node: this.getNode(x  , y-1), costMultiplier: 1 });
		if (this.nodeExists(x  , y+1)) list.push({ node: this.getNode(x  , y+1), costMultiplier: 1 });
		if (this.nodeExists(x+1, y-1)) list.push({ node: this.getNode(x+1, y-1), costMultiplier: Math.SQRT2 });
		if (this.nodeExists(x+1, y  )) list.push({ node: this.getNode(x+1, y  ), costMultiplier: 1 });
		if (this.nodeExists(x+1, y+1)) list.push({ node: this.getNode(x+1, y+1), costMultiplier: Math.SQRT2 });
		return list;
	}
	terrainToString() {
		var result = "";
		for (let x = 0; x < this.terrain.length; x++) {
			for (let y = 0; y < this.terrain[x].length; y++) {
				result += this.terrain[x][y];
			}
			result += "\n";
		}
		return result;
	}
	saveItself(name, callback) {
		fs.writeFile("maps/" + name, this.terrainToString(), 'utf8', callback);
	}
	getPreview() {

	}
	randomMap() {
		
	}
}
