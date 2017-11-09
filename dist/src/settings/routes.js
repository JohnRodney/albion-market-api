'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongodb = require('mongodb');

var _devmongo = require('../settings/devmongo');

var _devmongo2 = _interopRequireDefault(_devmongo);

var _items = require('./items.js');

var _items2 = _interopRequireDefault(_items);

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
      });
      var dropdown = '<select id="prices">';
      uniqueItemNames.forEach(function (name) {
        return dropdown += '<option value=' + name + '>' + _items2.default[name] + '</option>';
      });
      dropdown += '</select>';
      var script = '\n          <script>\n            var itemNameMap = ' + JSON.stringify(_items2.default) + ';\n            window.prices = ' + JSON.stringify(prices) + ';\n            document.addEventListener( "change", function(e) {\n              console.log(e.target.value);\n              var matchedPrice = window.prices.filter(p => p.ItemTypeId === e.target.value)[0];\n              console.log(matchedPrice.UnitPriceSilver / 10000)\n              document.getElementById(\'price-value\').innerHTML = \'<h1>Lowest Market Price: \' + matchedPrice.UnitPriceSilver / 10000 + \'</h1>\';\n            });\n            console.log(\'hey bitches\');\n          </script>\n        ';
      res.send('there are ' + prices.length + ' prices recorded ' + dropdown + ' ' + script + '<div id=\'price-value\'></div>');
    }).catch(function (err) {
      return Promise.resolve(console.log(err));
    });
  }
};


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