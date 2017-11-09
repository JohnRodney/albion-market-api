import { MongoClient } from 'mongodb';
import devMongoURI from '../settings/devmongo';
import itemNameMap from './items.js';
import styles from '../templates/styles';
import searchScript from '../templates/main-search';

import {
  postEndpoint,
} from '../routes/routes';


export default {
  '/postMarket/': postEndpoint,
  '*': (req, res) => {
    getPrices()
      .then(prices => {
        const itemNames = prices.map(price => price.ItemTypeId);
        const uniqueItemNames = itemNames.filter((itemName, i) => itemNames.indexOf(itemName) === i).sort();
        const script = searchScript(itemNameMap, prices);
        res.send(getResponseLayout(prices, getDropDown(uniqueItemNames, itemNameMap), script))
      })
      .catch(err => Promise.resolve(console.log(err)));
  },
};

function getDropDown(uniqueItemNames, itemNameMap) {
  let dropdown = '<select id="prices">';
  uniqueItemNames.forEach(name => dropdown += `<option value=${name}>${itemNameMap[name] || name}</option>`);
  dropdown += '</select>';
  return dropdown;
}

function getResponseLayout(prices, dropdown, script) {
  return `
    <div class='toolbar'>
      there are ${prices.length} prices recorded ${dropdown}
    </div>
    <div id='price-value'></div>
    ${styles}
    ${script}
  `;
}

function getPrices() {
  return new Promise((res, rej) => {
    MongoClient.connect(devMongoURI)
      .then((db) => {
        const prices = db.collection('prices').find().toArray();
        prices.then(p => res(p))
      });
  })
}
