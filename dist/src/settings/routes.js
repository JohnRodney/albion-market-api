'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongodb = require('mongodb');

var _devmongo = require('../settings/devmongo');

var _devmongo2 = _interopRequireDefault(_devmongo);

var _items = require('./items.js');

var _items2 = _interopRequireDefault(_items);

var _styles = require('../templates/styles');

var _styles2 = _interopRequireDefault(_styles);

var _mainSearch = require('../templates/main-search');

var _mainSearch2 = _interopRequireDefault(_mainSearch);

var _routes = require('../routes/routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  '/postMarket/': _routes.postEndpoint,
  '*': function _(req, res) {
    getPrices().then(function (prices) {
      var itemNames = prices.map(function (price) {
        return price.ItemTypeId;
      });
      var uniqueItemNames = itemNames.filter(function (itemName, i) {
        return itemNames.indexOf(itemName) === i;
      }).sort();
      var script = (0, _mainSearch2.default)(_items2.default, prices);
      res.send(getResponseLayout(prices, getDropDown(uniqueItemNames, _items2.default), script));
    }).catch(function (err) {
      return Promise.resolve(console.log(err));
    });
  }
};


function getDropDown(uniqueItemNames, itemNameMap) {
  var dropdown = '<select id="prices">';
  uniqueItemNames.forEach(function (name) {
    return dropdown += '<option value=' + name + '>' + (itemNameMap[name] || name) + '</option>';
  });
  dropdown += '</select>';
  return dropdown;
}

function getResponseLayout(prices, dropdown, script) {
  return '\n    <div class=\'toolbar\'>\n      there are ' + prices.length + ' prices recorded ' + dropdown + '\n    </div>\n    <div id=\'price-value\'></div>\n    ' + _styles2.default + '\n    ' + script + '\n  ';
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