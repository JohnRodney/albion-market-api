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
      var style = '\n          <style>\n            *{\n              padding: 0;\n              margin: 0;\n            }\n            .quantity{\n              position: absolute;\n            }\n            img {\n              height: 100px;\n              width: 100px;\n            }\n            #price-value{\n              padding-top: 60px;\n            }\n            .a-price {\n              padding: 20px;\n              position: relative;\n            }\n            .a-price:nth-child(even) {\n              background: #546E7A;\n              color: white;\n            }\n            .a-price:nth-child(odd) {\n              background: #607D8B;\n              color: white;\n            }\n            .a-price p, .a-price img {\n              display: inline-block;\n              padding: 10px;\n              vertical-align: middle;\n            }\n            .toolbar{\n              position: fixed;\n              width: 100%;\n              height: 60px;\n              background: #0097A7;\n              text-align: center;\n              color: white;\n              padding: 20px;\n              box-sizing: border-box;\n            }\n          </style>\n        ';
      var script = '\n          <script>\n            var itemNameMap = ' + JSON.stringify(_items2.default) + ';\n            window.prices = ' + JSON.stringify(prices) + ';\n            document.addEventListener( "change", function(e) {\n              var matchedPrice = window.prices.filter(p => p.ItemTypeId === e.target.value);\n              matchedPrice = matchedPrice.sort(function(a, b) {\n                return parseFloat(a.UnitPriceSilver) - parseFloat(b.UnitPriceSilver);\n              });\n              var foundIds = [];\n              var finalArray = [];\n              matchedPrice = matchedPrice.forEach(function(price, i) {\n                console.log(price, foundIds, finalArray)\n                if (foundIds.indexOf(price.Id) === -1) {\n                  foundIds.push(price.Id);\n                  finalArray.push(price);\n                }\n              });\n              matchedPrice = finalArray;\n              var layout = \'\';\n              matchedPrice.forEach(function(price, i) {\n                layout += \'<div class="a-price">\' +\n                \'<img src="\' + "https://s3-us-west-2.amazonaws.com/ao2d/images/items/"+ price.ItemTypeId +\'.png" />\' +\n                \'<div class="quantity">\' + price.Amount + \'</div>\' +\n                \'<p>Name: \' +\n                itemNameMap[price.ItemTypeId] +\n                \'</p><p>Quantity: \'\n                + price.Amount\n                + \'</p><p>Price: \' + price.UnitPriceSilver / 10000\n                + \'</p>\' + \'</div>\'\n              });\n              document.getElementById(\'price-value\').innerHTML = layout;\n            });\n            console.log(\'hey bitches\');\n          </script>\n        ';
      res.send('<div class=\'toolbar\'>there are ' + prices.length + ' prices recorded ' + dropdown + '</div> ' + style + ' ' + script + '<div id=\'price-value\'></div>');
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