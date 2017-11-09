'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postEndpoint = undefined;

var _mongodb = require('mongodb');

var _devmongo = require('../settings/devmongo');

var _devmongo2 = _interopRequireDefault(_devmongo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
MongoClient.connect(devMongoURI)
  .then((db) => {
    db.collection('prices'))
  })
  .catch(err => Promise.resolve(console.log(err)));
*/
var postEndpoint = exports.postEndpoint = function postEndpoint(req, res) {
  var data = JSON.parse(req.query.data).Orders;
  console.log('writing to mongo', data);
  _mongodb.MongoClient.connect(_devmongo2.default).then(function (db) {
    db.collection('prices').insertMany(data);
  }).catch(function (err) {
    return Promise.resolve(console.log(err));
  });
};