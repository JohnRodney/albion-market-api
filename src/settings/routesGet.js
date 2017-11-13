
import {
  postEndpoint,
  mainPage,
  destinyPage,
  getPlayerBoardsBySkill,
  getUndefinedSkills,
  getPriceOfItem
} from '../routes/routes';



export default {
  '/postMarket/': postEndpoint,	
  '/destiny/': destinyPage,
  '/item/:item': getPriceOfItem,
  '/destiny/:sid': getPlayerBoardsBySkill,
  '/skills/undefined/': getUndefinedSkills,
  '/': mainPage,
};

