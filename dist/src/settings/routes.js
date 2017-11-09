'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongodb = require('mongodb');

var _devmongo = require('../settings/devmongo');

var _devmongo2 = _interopRequireDefault(_devmongo);

var _routes = require('../routes/routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  '/postMarket/': _routes.postEndpoint,
  '*': function _(req, res) {
    _mongodb.MongoClient.connect(_devmongo2.default).then(function (db) {
      var prices = db.collection('prices').find().toArray();
      prices.then(function (p) {
        return res.send(p);
      });
    }).catch(function (err) {
      return Promise.resolve(console.log(err));
    });
  }
};