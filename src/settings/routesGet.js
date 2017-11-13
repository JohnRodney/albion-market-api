
import {
  postEndpoint,
  mainPage,
  destinyPage,
  getPlayerBoardsBySkill,
  getPriceOfItem
} from '../routes/routes';



export default {
  '/postMarket/': postEndpoint,	
  '/destiny/': destinyPage,
  '/item/:item': getPriceOfItem,
  '/destiny/:sid': getPlayerBoardsBySkill,
  '/': mainPage,
};

