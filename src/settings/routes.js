import { MongoClient } from 'mongodb';
import devMongoURI from '../settings/devmongo';
import itemNameMap from './items.js';
import {
  postEndpoint,
} from '../routes/routes';


export default {
  '/postMarket/': postEndpoint,
  '*': (req, res) => {
    getPrices()
      .then(prices => {
        const itemNames = prices.map(price => price.ItemTypeId);
        const uniqueItemNames = itemNames.filter((itemName, i) => itemNames.indexOf(itemName) === i);
        let dropdown = '<select id="prices">';
        uniqueItemNames.forEach(name => dropdown += `<option value=${name}>${itemNameMap[name]}</option>`);
        dropdown += '</select>';
        const script = `
          <script>
            var itemNameMap = ${JSON.stringify(itemNameMap)};
            window.prices = ${JSON.stringify(prices)};
            document.addEventListener( "change", function(e) {
              console.log(e.target.value);
              var matchedPrice = window.prices.filter(p => p.ItemTypeId === e.target.value)[0];
              console.log(matchedPrice.UnitPriceSilver / 10000)
              document.getElementById('price-value').innerHTML = '<h1>Lowest Market Price: ' + matchedPrice.UnitPriceSilver / 10000 + '</h1>';
            });
            console.log('hey bitches');
          </script>
        `
        res.send(`there are ${prices.length} prices recorded ${dropdown} ${script}<div id='price-value'></div>`)
      })
      .catch(err => Promise.resolve(console.log(err)));
  },
};

function getPrices() {
  return new Promise((res, rej) => {
    MongoClient.connect(devMongoURI)
      .then((db) => {
        const prices = db.collection('prices').find().toArray();
        prices.then(p => res(p))
      });
  })
}

