var http = require("http");
var Node = require("./node.js");
var Unit = require("./unit.js");
var GameMap = require("./map.js");
var Game = require("./game.js");
var consts = require("./enum.js");
var utils = require("./utils.js");

var GamesList = [];

http.createServer(function (request, response) {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	var game = new Game({map: consts.MAP_RANDOM});
	response.end(game.id);
}).listen(8081);
