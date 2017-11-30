
import {
  postEndpoint,
  mainPage,
  destinyPage,
  getPlayerBoardsBySkill,
  getUndefinedSkills,
  getPriceOfItem,
  getResourceMapByMid
  
} from '../routes/routes';



export default {
  '/postMarket/': postEndpoint,	
  '/destiny/': destinyPage,
  '/item/:item': getPriceOfItem,
  '/destiny/:sid': getPlayerBoardsBySkill,
  '/resourcemap/:mid': getResourceMapByMid,
  '/skills/undefined/': getUndefinedSkills,
  '/': mainPage,
};

