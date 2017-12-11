
import {
  mainPage,
  destinyPage,
  getPlayerBoardsBySkill,
  getUndefinedSkills,
  getPriceOfItem,
  getResourceMapByMid,
  getResourceNodesByMid
  
} from '../routes/routes';



export default {
  '/destiny/': destinyPage,
  '/item/:item': getPriceOfItem,
  '/destiny/:sid': getPlayerBoardsBySkill,
  '/resourcemap/:mid': getResourceMapByMid,
  '/nodes/:mid':getResourceNodesByMid,
  '/skills/undefined/': getUndefinedSkills,
  '/': mainPage,
};

