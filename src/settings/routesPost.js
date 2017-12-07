
import {
  postMarket,
  postGold,
  postSkills,
  postNodes,
} from '../routes/routes';


export default {
  '/postOrder/': postMarket,	
  '/postGold/': postGold,
  '/postSkills/': postSkills,
  '/postNodes/': postNodes,
  
};

