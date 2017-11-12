'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routesPost = require('./settings/routesPost');

var _routesPost2 = _interopRequireDefault(_routesPost);

var _routesGet = require('./settings/routesGet');

var _routesGet2 = _interopRequireDefault(_routesGet);

var _port = require('./settings/port');

var _port2 = _interopRequireDefault(_port);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var router = _express2.default.Router();

Object.keys(_routesGet2.default).forEach(function (route) {
    return router.get(route, _routesGet2.default[route]);
});
Object.keys(_routesPost2.default).forEach(function (route) {
    return router.post(route, _routesPost2.default[route]);
});

app.use(_bodyParser2.default.json());
app.use(router);
app.listen(_port2.default);

var http = require("http");
setInterval(function () {
    http.get("http://albion-data-revival.herokuapp.com");
}, 300000); // every 5 minutes (300000)

process.on('SIGTERM', function (e) {
    return process.exit(0);
});