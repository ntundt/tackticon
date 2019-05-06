module.exports = class AStar {
	constructor(map) {
		this.map = map;
		this.costTable = [];
		this.alreadyCalced = [];
		this.calcQueue = [];
		this.calcQueueIndex = 0;
		this.costsTable = {
			"g": 1,
			"w": false
		};
	}
	setStart(x, y) {
		this.startX = x;
		this.startY = y;
		this.costTable = [];
	}
	setEnd(x, y) {
		this.endX = x;
		this.endY = y;
		this.costTable = [];
	}
	calculateMinimalCost() {
		for (let i = 0; i < this.map.getXSize(); i++) {
			this.costTable.push([]);
			this.alreadyCalced.push([]);
		}
		this.calcQueue.push({ node: this.map.getNode(this.startX, this.startY), costMultiplier: 1});
		this.costTable[this.startX][this.startY] = 0;
		this.calculateNeighboursCosts(this.startX, this.startY);
		return this.costTable[this.endX][this.endY];
	}
	alreadyInQueue(x, y) {
		for (let i = 0; i < this.calcQueue.length; i++) {
			if (this.calcQueue[i].node.x == x && this.calcQueue[i].node.y == y) {
				return true;
			}
		}
		return false;
	}
	calculateNeighboursCosts(x, y) {
		var nowCalculating = this.calcQueue[this.calcQueueIndex];
		var neightbours = this.map.getAdjacentNodes(nowCalculating.node.x, nowCalculating.node.y);
		for (let i = 0; i < neightbours.length; i++) {
			if (this.costsTable[neightbours[i].node.type] * neightbours[i].costMultiplier + this.costTable[x][y] < this.costTable[neightbours[i].node.x][neightbours[i].node.y] || this.costTable[neightbours[i].node.x][neightbours[i].node.y] === undefined) {
				this.costTable[neightbours[i].node.x][neightbours[i].node.y] = this.costsTable[neightbours[i].node.type] * neightbours[i].costMultiplier + this.costTable[x][y];
				// if (this.alreadyCalced[neightbours[i].node.x][neightbours[i].node.y] == undefined)
				// 	this.calculateNeighboursCosts(neightbours[i].node.x, neightbours[i].node.y);
			}
			if (!this.alreadyInQueue(neightbours[i].node.x, neightbours[i].node.y) && this.costsTable[neightbours[i].node.type] !== false) {
				this.calcQueue.push(neightbours[i]);
			}
		}
		this.calcQueueIndex++;
		var nextCalculating = this.calcQueue[this.calcQueueIndex];
		if (nextCalculating !== undefined)
			this.calculateNeighboursCosts(nextCalculating.node.x, nextCalculating.node.y);
	}
}