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
        const style = `
          <style>
            *{
              padding: 0;
              margin: 0;
            }
            .quantity{
              position: absolute;
              top: 95px;
              left: 94px;
              width: 25px;
              text-align: center;
              padding 3px;
              background: rgba(0, 0, 0, .2);
              border-radius: 100%;
            }
            img {
              height: 100px;
              width: 100px;
            }
            #price-value{
              padding-top: 60px;
            }
            .a-price {
              padding: 20px;
              position: relative;
            }
            .a-price:nth-child(even) {
              background: #546E7A;
              color: white;
            }
            .a-price:nth-child(odd) {
              background: #607D8B;
              color: white;
            }
            p {
             font-size: 32px;
            }
            .a-price p, .a-price img {
              display: inline-block;
              padding: 10px;
              vertical-align: middle;
            }
            .toolbar{
              position: fixed;
              width: 100%;
              height: 60px;
              background: #0097A7;
              text-align: center;
              color: white;
              padding: 20px;
              box-sizing: border-box;
            }
          </style>
        `
        const script = `
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
          <script>
            function removeImages() {
               $("img").each(function(){
                  var image = $(this);
                  if(image.naturalWidth == 0 || image.readyState == 'uninitialized'){
                     $(image).unbind("error").hide();
                  }
               });
            };
          </script>
          <script>
            var itemNameMap = ${JSON.stringify(itemNameMap)};
            window.prices = ${JSON.stringify(prices)};
            document.addEventListener( "change", function(e) {
              var matchedPrice = window.prices.filter(p => p.ItemTypeId === e.target.value);
              matchedPrice = matchedPrice.sort(function(a, b) {
                return parseFloat(a.UnitPriceSilver) - parseFloat(b.UnitPriceSilver);
              });
              var foundIds = [];
              var finalArray = [];
              matchedPrice = matchedPrice.forEach(function(price, i) {
                console.log(price, foundIds, finalArray)
                if (foundIds.indexOf(price.Id) === -1) {
                  foundIds.push(price.Id);
                  finalArray.push(price);
                }
              });
              matchedPrice = finalArray;
              var layout = '';
              matchedPrice.forEach(function(price, i) {
                layout += '<div class="a-price">' +
                '<img src="' + "https://s3-us-west-2.amazonaws.com/ao2d/images/items/"+ price.ItemTypeId +'.png" onError="this.onerror=null;this.remove();"/>' +
                '<img src="' + "https://gameinfo.albiononline.com/api/gameinfo/items/"+ price.ItemTypeId +'.png" onError="this.onerror=null;this.remove();" />' +
                '<div class="quantity">' + price.Amount + '</div>' +
                '<p>' + price.UnitPriceSilver / 10000 + ' silver</p>' + '</div>'
              });
              document.getElementById('price-value').innerHTML = layout;
            });
          </script>
        `;
        res.send(`<div class='toolbar'>there are ${prices.length} prices recorded ${dropdown}</div> ${style} ${script}<div id='price-value'></div>`)
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
