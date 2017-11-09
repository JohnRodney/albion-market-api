
import {
  postEndpoint,
  mainPage,
} from '../routes/routes';


export default {
  '/postMarket/': postEndpoint,
  '*': mainPage,
};
