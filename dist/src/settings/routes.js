'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _routes = require('../routes/routes');

exports.default = {
  '/postMarket/': _routes.postEndpoint,
  '/': _routes.mainPage
};