'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _routes = require('../routes/routes');

exports.default = {
  '/postMarket/': _routes.postMarket,
  '/postGold/': _routes.postGold,
  '/postSkills/': _routes.postSkills,
  '/postNodes/': _routes.postNodes

};