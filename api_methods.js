var requirations;

var gamesList = musthave.gamesListInstance;
var Users = musthave.Users;

function connect(query, errors) {
	return gamesList.getGameById(game_id).newPlayer(query.access_token);
}

function games_new(query, errors) {
	return gamesList.startNewGame({
		mapOptions: {
			mapName: (query.map_name == "random" ? consts.MAP_RANDOM : query.map_name)
		}
	}).id;
}

function unit_move(query, errors) {
	return game.getUnitById(query.unit_id).moveTo(query.x, query.y);
}

function unit_attack(query, errors) {
	var game = gamesList.getGameById(query.game_id);
	var defender = game.getUnitById(query.defender_id);
	var attacker = game.getUnitById(query.attacker_id);
	return attacker.attack(defender);
}

function map_get(query, errors) {
	var game = gamesList.getGameById(query.game_id);
	return game.getMap();
}


module.exports = {
	connect,
	games_new,
	unit_move,
	unit_attack,
	map_get
}
