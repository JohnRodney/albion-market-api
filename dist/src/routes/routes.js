'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.mainPage = exports.postSkills = exports.getPlayerBoardsBySkill = exports.destinyPage = exports.getPriceOfItem = exports.postNodes = exports.postGold = exports.getUndefinedSkills = exports.postEndpoint = undefined;

var _mongodb = require('mongodb');

var _devmongo = require('../settings/devmongo');

var _devmongo2 = _interopRequireDefault(_devmongo);

var _items = require('../settings/items.js');

var _items2 = _interopRequireDefault(_items);

var _styles = require('../templates/styles');

var _styles2 = _interopRequireDefault(_styles);

var _mainSearch = require('../templates/main-search');

var _mainSearch2 = _interopRequireDefault(_mainSearch);

var _destinySearch = require('../templates/destiny-search');

var _destinySearch2 = _interopRequireDefault(_destinySearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var skills = ["20", "22", "25", "27", "28", "30", "32", "34", "36", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "59", "60", "61", "64", "65", "66", "67", "79", "81", "82", "83", "86", "88", "90", "91", "93", "95", "96", "98", "99", "100", "107", "109", "110", "111", "113", "118", "123", "124", "125", "126", "128", "130", "132", "133", "135", "136", "140", "141", "145", "146", "147", "148", "161", "170", "171", "175", "178", "269", "270", "271", "274", "308", "309", "310", "311", "313", "314", "315", "316", "317", "318", "319", "320", "321", "322", "323", "324", "325", "326", "327", "328", "343", "344", "348", "353", "354", "360", "365", "366", "386", "389", "395", "401", "408", "418"];

var postEndpoint = exports.postEndpoint = function postEndpoint(req, res) {
	/* parse the data from the query params */
	var data = JSON.parse(req.query.data).Orders;

	/* insert all of the entries as single prices */
	_mongodb.MongoClient.connect(_devmongo2.default).then(function (db) {
		return db.collection('prices').insertMany(data);
	}).catch(function (err) {
		return Promise.resolve(console.log(err));
	});

	res.sendStatus(200);
};
var getUndefinedSkills = exports.getUndefinedSkills = function getUndefinedSkills(req, res) {
	/* parse the data from the query params */
	//const data = JSON.parse(req.params.sid);

	getUndefinedBoards(skills).then(function (boards) {
		res.send(boards);
	}).catch(function (err) {
		return Promise.resolve(console.log(err));
	});
};
var postGold = exports.postGold = function postGold(req, res) {
	/* parse the data from the query params */

	var data = req.body;

	_mongodb.MongoClient.connect(_devmongo2.default).then(function (db) {
		return db.collection('goldPrices').insert(data);
	}).catch(function (err) {
		return Promise.resolve(console.log(err));
	});

	res.sendStatus(200);
};

var postNodes = exports.postNodes = function postNodes(req, res) {
	var data = req.body;
	//console.log(data.skills.length);

	//if(data.skills.length >70){
	//	setTimeout(function() {
	//		delayedprocess(data,req,res)
	//	}, 30000);

	//console.log(data);

	_mongodb.MongoClient.connect(_devmongo2.default, function (err, db) {
		var bulk = db.collection("ResourceNodes").initializeUnorderedBulkOp();
		console.log(data);
		var updatefield = {};
		for (var i = 0, len = data.nodes.length; i < len; i++) {
			var query = { NodeId: data.NodeId };
			updatefield = {
				$set: {
					NodeId: data.nodes[i].NodeId,
					NodeTier: data.nodes[i].NodeTier,
					NodeCharges: data.nodes[i].NodeCharges,
					NodeLocationX: data.nodes[i].NodeLocationX,
					NodeLocationZ: data.nodes[i].NodeLocationZ,
					NodeThing: data.nodes[i].NodeThing,
					Zone: data.zone
				}
			};

			if (Object.keys(updatefield).length) {
				bulk.find(query).upsert().update(updatefield);
			}
		}
		setTimeout(function () {
			bulk.execute();
		}, 10000);
	});

	res.sendStatus(200);
};

var getPriceOfItem = exports.getPriceOfItem = function getPriceOfItem(req, res) {
	/* parse the data from the query params */

	getItemPrices(req.params.item).then(function (prices) {
		res.send(prices);
	}).catch(function (err) {
		return Promise.resolve(console.log(err));
	});
};

var destinyPage = exports.destinyPage = function destinyPage(req, res) {
	getBoards().then(function (boards) {
		var playerNames = boards.map(function (board) {
			return board.player;
		});
		var uniquePlayerNames = playerNames.filter(function (playerName, i) {
			return playerNames.indexOf(playerName) === i;
		}).sort();

		res.send(getResponseLayout2(boards, getDropDown2(uniquePlayerNames), (0, _destinySearch2.default)(boards)));
	}).catch(function (err) {
		return Promise.resolve(console.log(err));
	});
};

var getPlayerBoardsBySkill = exports.getPlayerBoardsBySkill = function getPlayerBoardsBySkill(req, res) {

	getBoardsBySkill(req.params.sid).then(function (boards) {
		res.send(boards);
	}).catch(function (err) {
		return Promise.resolve(console.log(err));
	});
};

var postSkills = exports.postSkills = function postSkills(req, res) {
	var data = req.body;
	//console.log(data.skills.length);

	//if(data.skills.length >70){
	//	setTimeout(function() {
	//		delayedprocess(data,req,res)
	//	}, 30000);

	//console.log(data);
	_mongodb.MongoClient.connect(_devmongo2.default, function (err, db) {
		var bulk = db.collection("destinyBoards").initializeUnorderedBulkOp();
		console.log(data.skills.length);
		var updatefield = {};
		for (var i = 0, len = data.skills.length; i < len; i++) {
			var query = { player: data.player, SID: data.skills[i].SID };
			updatefield = {
				$set: {
					player: data.player,
					SID: data.skills[i].SID,
					SLVL: data.skills[i].SLVL,
					SPER: data.skills[i].SPER
				}
			};

			if (Object.keys(updatefield).length) {
				bulk.find(query).upsert().update(updatefield);
			}
		}
		setTimeout(function () {
			bulk.execute();
		}, 10000);
	});

	/*
 
 MongoClient.connect(devMongoURI, function(err, db) {
 	var query = { player: data.player };
 	
 	
 	
 	
 	
 	db.collection("destinyBoards").update({ _id: id },
 	
 	
 	find(query).toArray(function(err, result) {
 		if (err) throw err;
 		//console.log(result.length);
 		if(result.length ==1){
 			console.log("Updated 1 player's destiny board: "+data.player);
 			//get ida
 			var id = result[0]['_id'];
 			var skills = result[0]['skills'];
 			//console.log(skills);			
 			//grab current skills
 			//update skills
 			
 					for (var i = 0, len = data.skills.length; i < len; i++) {
 				skills[i]=data.skills[i];
 			}								
 							
 			//and do update
 					db.collection("destinyBoards").update(
 				{ _id: id },
 				{
 					$set: {
 						"skills": skills,
 						"timestamp": Date.now()
 					}
 				}
 			)
 
 		}else{
 			//do insert
 			
 			//add the timestamp
 			data.timestamp=Date.now();
 			
 			// fix skill structure
 			var newskills={};
 			for (var i = 0, len = data.skills.length; i < len; i++) {
 				newskills[i]=data.skills[i];
 			}
 			data.skills=newskills;
 			
 			db.collection("destinyBoards").insertOne(data, function(err, res) {
 				if (err) throw err;
 				console.log("1 New player's destiny board added: "+data.player);
 				if(data.player==""){
 					console.log(data);
 				}
 			});
 		}
 		//console.log(result);
 		db.close();
 	});
 });
 */

	res.sendStatus(200);
};

var mainPage = exports.mainPage = function mainPage(req, res) {
	getPrices().then(function (prices) {
		var itemNames = prices.map(function (price) {
			return price.ItemTypeId;
		});
		var uniqueItemNames = itemNames.filter(function (itemName, i) {
			return itemNames.indexOf(itemName) === i;
		}).sort();

		res.send(getResponseLayout(prices, getDropDown(uniqueItemNames, _items2.default), (0, _mainSearch2.default)(_items2.default, prices)));
	}).catch(function (err) {
		return Promise.resolve(console.log(err));
	});
};

function getDropDown(uniqueItemNames, itemNameMap) {
	var dropdown = '<select id="prices">';
	uniqueItemNames.forEach(function (name) {
		return dropdown += '<option value=' + name + '>' + (itemNameMap[name] || name) + '</option>';
	});
	dropdown += '</select>';
	return dropdown;
}
function getDropDown2(uniqueItemNames) {
	var dropdown = '<select id="players">';
	uniqueItemNames.forEach(function (name) {
		return dropdown += '<option value=' + name + '>' + name + '</option>';
	});
	dropdown += '</select>';
	return dropdown;
}

function getResponseLayout(prices, dropdown, script) {
	return '\n    <div class=\'toolbar\'>\n      there are ' + prices.length + ' prices recorded ' + dropdown + '\n    </div>\n    <div id=\'price-value\'></div>\n    ' + _styles2.default + '\n    ' + script + '\n  ';
}
function getResponseLayout2(prices, dropdown, script) {
	var newlen = prices.length / 2;
	return '\n    <div class=\'toolbar\'>\n      there are ' + newlen + ' Destiny Boards recorded ' + dropdown + '\n    </div>\n    <div id=\'price-value\'></div>\n    ' + _styles2.default + '\n\t' + script + '\n  ';
}
function getPrices() {
	return new Promise(function (res, rej) {
		_mongodb.MongoClient.connect(_devmongo2.default).then(function (db) {
			var prices = db.collection('prices').find().toArray();
			prices.then(function (p) {
				return res(p);
			});
		});
	});
}

function getItemPrices(item) {
	var query = { ItemGroupTypeId: item };
	var fields = {
		"ItemGroupTypeId": true,
		"LocationId": true,
		"QualityLevel": true,
		"EnchantmentLevel": true,
		"UnitPriceSilver": true,
		"Amount": true,
		"AuctionType": true,
		"Expires": true
	};

	var options = {
		"limit": 1,
		"sort": [['UnitPriceSilver', 'asc']]
	};

	return new Promise(function (res, rej) {
		_mongodb.MongoClient.connect(_devmongo2.default).then(function (db) {
			var prices = db.collection('prices').findOne(query, fields, options);
			prices.then(function (p) {
				return res(p);
			});
		});
	});
}
function getBoards() {
	return new Promise(function (res, rej) {
		_mongodb.MongoClient.connect(_devmongo2.default).then(function (db) {
			var boards = db.collection('destinyBoards').find().toArray();
			boards.then(function (p) {
				return res(p);
			});
		});
	});
}
function getUndefinedBoards(skills) {
	var query = { SID: { $nin: skills } };

	return new Promise(function (res, rej) {
		_mongodb.MongoClient.connect(_devmongo2.default).then(function (db) {
			var boards = db.collection('destinyBoards').find(query).toArray();
			boards.then(function (p) {
				return res(p);
			});
		});
	});
}
function getBoardsBySkill(SID) {
	return new Promise(function (res, rej) {
		_mongodb.MongoClient.connect(_devmongo2.default).then(function (db) {
			var query = { SID: SID };
			var mysort = { SLVL: 1 };
			var boards = db.collection('destinyBoards').find(query).sort(mysort).toArray();
			boards.then(function (p) {
				return res(p);
			});
		});
	});
}
function delayedprocess(data, req, res) {
	/*	
 			MongoClient.connect(devMongoURI, function(err, db) {
 			var query = { player: data.player };
 			db.collection("destinyBoards").find(query).toArray(function(err, result) {
 				if (err) throw err;
 				//console.log("in deleayed");
 				//console.log("result lenght:"+result.length);
 				if(result.length ==1){
 					console.log("Updated 1 player's destiny board: "+data.player);
 					//get ida
 					var id = result[0]['_id'];
 					var skills = result[0]['skills'];
 					//console.log(skills);			
 					//grab current skills
 					//update skills
 					
 
 					for (var i = 0, len = data.skills.length; i < len; i++) {
 						skills[]=data.skills[i];
 					}								
 									
 					//and do update
 
 					db.collection("destinyBoards").update(
 						{ _id: id },
 						{
 							$set: {
 								"skills": skills,
 								"timestamp": Date.now()
 							}
 						}
 					)
 //console.log("update done");
 
 				}else{
 					//do insert
 					//console.log("do insert");
 					//add the timestamp
 					data.timestamp=Date.now();
 					
 					// fix skill structure
 					var newskills={};
 					for (var i = 0, len = data.skills.length; i < len; i++) {
 						newskills[i]=data.skills[i];
 					}
 					data.skills=newskills;
 					
 					db.collection("destinyBoards").insertOne(data, function(err, res) {
 						if (err) throw err;
 						console.log("1 New player's destiny board added: "+data.player);
 						if(data.player==""){
 							console.log(data);
 						}
 					});
 					//	console.log("insert done");
 				}
 				//console.log(result);
 				db.close();
 			});
 		});	
 		*/
}