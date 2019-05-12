var http = require("http");
var fs = require("fs");

var Node = require("./node.js");
var Unit = require("./unit.js");
var GameMap = require("./map.js");
var Game = require("./game.js");
var GamesList = require("./games_list.js");
var Api = require("./api.js");
var AStar = require("./astar.js");

var consts = require("./enum.js");
var utils = require("./utils.js");
var logger = require("./logger.js");

var config = JSON.parse(fs.readFileSync("./config/config.json"));

var gamesListInstance = new GamesList();
var API = new Api(gamesListInstance);

gamesListInstance.startNewGame({
	mapOptions: "1.map", 
	config: "attack.json"
});

// setInterval(function() {
// 	logger.log("Saving…");
// 	gamesListInstance.saveAll(function() {logger.log("Saved")});
// }, 10000);

http.createServer(function(request, response) {
	var parameters = utils.getParameters(request.url);

	var path = utils.getUrlFolders(request.url);
	if (path[1] == "method")
	if (path[2] != "") {
		response.writeHead(200, {'Content-Type': 'text/json'});
		response.end(JSON.stringify(API.callMethod(path[2], parameters)));
	} else {
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.end("Do not open the link! Paste it into the client.");
	};
	if (path[0] == '' && (path[1] == '' || path[1] == 'index.html'))
		utils.showInterface(response);
	var game = gamesListInstance.startNewGame({map: consts.MAP_RANDOM});

	// var astar = new AStar(gamesListInstance.list[0].map);
	// astar.setStart(0,0);
	// astar.setEnd(6,6);
	// response.writeHead(200, {'Content-Type': 'text/plain'});
	// response.end(astar.calculateMinimalCost().toString());
}).listen(8081);
