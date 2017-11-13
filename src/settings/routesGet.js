
import {
  postEndpoint,
  mainPage,
  destinyPage,
  getBoardsBySkill,
  getPriceOfItem
} from '../routes/routes';



export default {
  '/postMarket/': postEndpoint,	
  '/destiny/': destinyPage,
  '/item/:item': getPriceOfItem,
  '/destiny/:sid':getBoardsBySkill,
  '/': mainPage,
};

