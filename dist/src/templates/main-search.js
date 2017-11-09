'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = searchScript;
function layoutFromPrice(price) {
  return '\n    <div class="a-price">\n      <img src="' + ('https://s3-us-west-2.amazonaws.com/ao2d/images/items/' + price.ItemTypeId + '.png') + '" onError="this.onerror=null;this.remove();"/>\n      <img src="' + ('https://gameinfo.albiononline.com/api/gameinfo/items/' + price.ItemTypeId + '.png') + '" onError="this.onerror=null;this.remove();"/>\n      <div class="quantity">' + price.Amount + '</div>\n      <p>' + price.UnitPriceSilver / 10000 + ' silver</p>\n    </div>\n  ';
}

function handleDropDownChange(e) {
  /* find the matching prices */
  var matchedPrice = window.prices.filter(function (p) {
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

  var pricesLayout = '';
  finalArray.forEach(function (price, i) {
    return pricesLayout += layoutFromPrice(price);
  });
  document.getElementById('price-value').innerHTML = pricesLayout;
}

function searchScript(itemNameMap, prices) {
  return '\n    <script>\n      var itemNameMap = ' + JSON.stringify(itemNameMap) + ';\n      window.prices = ' + JSON.stringify(prices) + ';\n      window.layoutFromPrice = ' + layoutFromPrice + ';\n      document.addEventListener("change", ' + handleDropDownChange + ');\n    </script>\n  ';
}