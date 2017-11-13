'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _routes = require('../routes/routes');

exports.default = {
  '/postMarket/': _routes.postEndpoint,
  '/destiny/': _routes.destinyPage,
  '/item/:item': _routes.getPriceOfItem,
  '/destiny/:sid': _routes.getPlayerBoardsBySkill,
  '/': _routes.mainPage
};