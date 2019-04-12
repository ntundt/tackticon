var fs = require("fs");
var Node = require("./node.js");

module.exports = class GameMap {
	constructor(map) {
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

		var stringifiedMap = fs.readFileSync(map);
		stringifiedMap = stringifiedMap.explode("\n");
		
		for (var i = 0; i < stringifiedMap.length; i++) {
			for (var j = 0; j < stringifiedMap[i].length; j++) {
				this.map_object[i][j] = new Node(stringifiedMap[i].charAt(j));
			}
		}
	}
	getNode(x, y) {
		this.map_object[x][y];
	}
	getPreview() {

	}
	randomMap() {
		
	}
}
