'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _routes = require('../routes/routes');

exports.default = {
  '/destiny/': _routes.destinyPage,
  '/item/:item': _routes.getPriceOfItem,
  '/destiny/:sid': _routes.getPlayerBoardsBySkill,
  '/resourcemap/:mid': _routes.getResourceMapByMid,
  '/skills/undefined/': _routes.getUndefinedSkills,
  '/': _routes.mainPage
};