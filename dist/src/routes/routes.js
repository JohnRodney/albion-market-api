'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mainPage = exports.postSkills = exports.destinyPage = exports.postGold = exports.postEndpoint = undefined;

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

var postSkills = exports.postSkills = function postSkills(req, res) {
  var data = req.body;

  _mongodb.MongoClient.connect(_devmongo2.default, function (err, db) {
    var query = { player: data.player };
    db.collection("destinyBoards").find(query).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });

    /*
    if (err) throw err;
     data.timestamp=Date.now();
     db.collection("destinyBoards").insertOne(data, function(err, res) {
    if (err) throw err;
    console.log("1 Destiny board inserted");
    db.close();
     });
     
     */
  });
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