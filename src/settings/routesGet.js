
import {
  mainPage,
  destinyPage,
  getPlayerBoardsBySkill,
  getUndefinedSkills,
  getPriceOfItem,
  getResourceMapByMid
  
} from '../routes/routes';



export default {
  '/destiny/': destinyPage,
  '/item/:item': getPriceOfItem,
  '/destiny/:sid': getPlayerBoardsBySkill,
  '/resourcemap/:mid': getResourceMapByMid,
  '/skills/undefined/': getUndefinedSkills,
  '/': mainPage,
};

