
import {
  postEndpoint,
  mainPage,
  postGold,
} from '../routes/routes';


export default {
  '/postMarket/': postEndpoint,
  '/postGold/': postGold,
  '/': mainPage,
};
