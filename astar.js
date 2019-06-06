module.exports = class AStar {
	constructor(map) {
		this.map = map;
		this.costTable = [];
		this.alreadyCalced = [];
		this.calcQueue = [];
		this.calcQueueIndex = 0;
		this.prices = {};
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
	setPrices(prices) {
		this.prices = prices;
		this.costTable = [];
	}
	calculateMinimalCost() {
		for (let i = 0; i < this.map.getXSize(); i++) {
			this.costTable.push([]);
			this.alreadyCalced.push([]);
		}
		this.calcQueue.push({ node: this.map.getNode(this.startX, this.startY), costMultiplier: 1 });
		this.costTable[this.startX][this.startY] = 0;

		while (this.calcQueue[this.calcQueueIndex]) {
			var nowCalculating = this.calcQueue[this.calcQueueIndex];
			var neightbours = this.map.getAdjacentNodes(nowCalculating.node.x, nowCalculating.node.y);
			for (let i = 0; i < neightbours.length; i++) {
				if (this.prices[neightbours[i].node.type] * neightbours[i].costMultiplier + this.costTable[nowCalculating.node.x][nowCalculating.node.y] < this.costTable[neightbours[i].node.x][neightbours[i].node.y]) {
					this.calcQueue.push(neightbours[i]);
				}
				if (this.prices[neightbours[i].node.type] * neightbours[i].costMultiplier + this.costTable[nowCalculating.node.x][nowCalculating.node.y] < this.costTable[neightbours[i].node.x][neightbours[i].node.y] || this.costTable[neightbours[i].node.x][neightbours[i].node.y] === undefined) {
					this.costTable[neightbours[i].node.x][neightbours[i].node.y] = this.prices[neightbours[i].node.type] * neightbours[i].costMultiplier + this.costTable[nowCalculating.node.x][nowCalculating.node.y];
				}
				if (!this.alreadyInQueue(neightbours[i].node.x, neightbours[i].node.y) && this.prices[neightbours[i].node.type] !== false) {
					this.calcQueue.push(neightbours[i]);
				}
			}
			this.calcQueueIndex++;
		}

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
}
