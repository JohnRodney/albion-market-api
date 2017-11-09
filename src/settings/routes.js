
import {
  postEndpoint,
  mainPage,
  postGold,
} from '../routes/routes';


export default {
  '/postMarket/': postEndpoint,
  '/': mainPage,
  '/postGold/': postGold,
};
