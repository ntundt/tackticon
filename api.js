var requirations = {
	connect: ['game'],
	move: ['game', 'x', 'y', 'unit_id'],
	newGame: ['game']
}

module.exports = class API {
	constructor(gamesList) {
		this.gamesList = gamesList;
	}
	callMethod(method, options) {
		var response = {};
		var errors = [];

		var game = undefined;
		if (options.game !== undefined) {
			game = this.gamesList.getGameById(options.game);
		}

		if (!this.checkRequiredParameters(method, options)) {
			errors.push({code: 100, description: "One of the required parameters was specified missing or invalid"})
		}

		switch (method) {
		case 'connect':
			try {
				response = game.connect(options.nick);
			} catch (e) {
				if (e.name == 'TypeError')
					errors.push({code: 101, description: "Game with specified id is undefined"});
				else
					throw e;
			}
			break;
		case 'newGame':
			response = this.gamesList.startNewGame();
			break;
		}
		return this.makeResponseObject(response, errors);
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
		for (var i = 0; i < req.length; i++) {
			if (parameters[req[i]] === undefined) {
				return false;
			}
		}
		return true;
	}
}
