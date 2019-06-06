var http = require("http");
var fs = require("fs");
var express = require("express");
var app = express();

var Node = require("./node.js");
var Unit = require("./unit.js");
var GameMap = require("./map.js");
var Game = require("./game.js");
var GamesList = require("./games_list.js");
var AStar = require("./astar.js");
var Users = require("./users.js");

var consts = require("./enum.js");
var utils = require("./utils.js");
var logger = require("./logger.js");

var settings = require("./file_loader.js").loadJson("./config/settings.json");

var gamesListInstance = new GamesList();

global.musthave = {
	gamesListInstance,
	logger,
	Users
};

var Api = require("./api.js");
var API = new Api(gamesListInstance);


if (settings.enable_debug_messages) {
	logger.enableDebug();
}

if (settings.enable_autosave) {
	setInterval(function() {
	 	logger.log("Saving running games…");
	 	gamesListInstance.saveAll(function() {logger.log("Saved successfully")});
	}, settings.autosave_interval * 1000);
}

app.use(express.static('markup'));

app.get("/method/:method_name", (req, res) => {
	res.set({
		"Content-Type": "text/json"
	})
	try {
		let response = API.callMethod(req.params.method_name, req.query);
	} catch (e) {
		console.log(e);
	}
	res.end(JSON.stringify(response));
});

app.listen(settings.server_port);
