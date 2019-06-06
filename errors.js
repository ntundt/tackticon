class ErrorsList {
	constructor() {
		this.list = []
	}
	addError(code) {
		this.list.push(new APIError(code));
	}
	toArray() {
		if (this.list.length == 0) {
			return false;
		} else if (this.list.length == 1) {
			return this.list[0].toArray();
		} else {
			var list = [];
			for (let i = 0; i < this.list.length; i++) {
				list.push(this.list[i].toArray());
			}
			return list;
		}
	}
}
class APIError {
	constructor(code) {
		this.code = code;
	}
	toArray() {
		return {
			code: this.code,
			description: "Sample description"
		}
	}
}

module.exports = {
	ErrorsList,
	APIError
}