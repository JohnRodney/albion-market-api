
import {
  postEndpoint,
  mainPage,
  destinyPage
} from '../routes/routes';



export default {
  '/postMarket/': postEndpoint,	
  '/destiny/': destinyPage,
  '/': mainPage,
};

