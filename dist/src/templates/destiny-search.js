'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = destinyboard;
/* Generate an html layout from a single price data entry */
function layoutFromPrice(price) {
  return '\n    <div class="a-price">\n      <img src="' + ('https://s3-us-west-2.amazonaws.com/ao2d/images/items/' + price.ItemTypeId + '.png') + '" onError="this.onerror=null;this.remove();"/>\n      <img src="' + ('https://gameinfo.albiononline.com/api/gameinfo/items/' + price.ItemTypeId + '.png') + '" onError="this.onerror=null;this.remove();"/>\n      <div class="quantity">' + price.Amount + '</div>\n      <p>' + price.UnitPriceSilver / 10000 + ' silver</p>\n    </div>\n  ';
}

function handleDestinyDropDownChange(e) {
  /* find the matching prices */
  var matched = window.prices.filter(function (p) {
    return p.ItemTypeId === e.target.value;
  });

  /* Sort the matching prices */
  matchedPrice = matchedPrice.sort(function (a, b) {
    return parseFloat(a.UnitPriceSilver) - parseFloat(b.UnitPriceSilver);
  });

  /* empty arrays for tracking used to dedupe data*/
  var foundIds = [];
  var finalArray = [];

  /* create a final array of only unique data */
  matchedPrice = matchedPrice.forEach(function (price, i) {
    if (foundIds.indexOf(price.Id) === -1) {
      foundIds.push(price.Id);
      finalArray.push(price);
    }
  });

  /* start with an empty layout */
  var pricesLayout = '';
  /* iterate over all unique prices and append a price layout */
  finalArray.forEach(function (price, i) {
    return pricesLayout += layoutFromPrice(price);
  });
  /* set the HTML if #price-value to the final layout of prices */
  document.getElementById('price-value').innerHTML = pricesLayout;
}

function destinyboard(destinyboards) {
  return '\n    <script>\n      window.destinyboards = ' + JSON.stringify(destinyboards) + ';\n      document.addEventListener("change", ' + handleDestinyDropDownChange + ');\n    </script>\n  ';
}