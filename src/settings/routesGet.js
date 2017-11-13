
import {
  postEndpoint,
  mainPage,
  destinyPage,
  getPriceOfItem
} from '../routes/routes';



export default {
  '/postMarket/': postEndpoint,	
  '/destiny/': destinyPage,
  '/item/:item': getPriceOfItem,
  '/': mainPage,
};

