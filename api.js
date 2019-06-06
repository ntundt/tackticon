var requirations = {
	connect: ['auth', 'game'],
	move: ['auth', 'game', 'x', 'y', 'unit_id'],
	newGame: ['auth', 'game']
}

var errors = require("./errors.js");
var ErrorsList = errors.ErrorsList;
var APIError = errors.APIError;
var APIMethods = require("./api_methods.js");

module.exports = class API {
	constructor(gamesList) {
		this.gamesList = gamesList;
	}
	callMethod(method, options) {
		var response = {};
		var errors = new ErrorsList();

		var game = undefined;
		if (options.game !== undefined) {
			game = this.gamesList.getGameById(options.game);
		}

		if (!this.checkRequiredParameters(method, options)) {
			errors.newError(100);
		}

		response = APIMethods[method.replace(".", "_")](options, errors);

		return this.makeResponseObject(response, errors.toArray());
	}
	makeResponseObject(response=[], error=[]) {
		var what_to_respond = {};
		if (response !== false && response !== undefined)
			if (typeof response == "array") {
				if (response.length >= 1)
					what_to_respond.response = response;
			} else {
				what_to_respond.response = response;
			};
		if (error !== false && error !== undefined)
			if (typeof error == "array") {
				if (error.length == 1)
					what_to_respond.error = error[1]
				else if (error.length >= 2)
					what_to_respond.error = error;
			} else {
				what_to_respond.error = error;
			};
		return what_to_respond;
	}
	checkRequiredParameters(method, parameters) {
		var req = requirations[method];
		if (req !== undefined) {
			for (var i = 0; i < req.length; i++) {
				if (parameters[req[i]] === undefined) {
					return false;
				}
			}
			return true; 
		} else {
			return true;
		}
	}
}
