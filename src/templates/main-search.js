function layoutFromPrice(price) {
  return `
    <div class="a-price">
      <img src="${`https://s3-us-west-2.amazonaws.com/ao2d/images/items/${price.ItemTypeId}.png`}" onError="this.onerror=null;this.remove();"/>
      <img src="${`https://gameinfo.albiononline.com/api/gameinfo/items/${price.ItemTypeId}.png`}" onError="this.onerror=null;this.remove();"/>
      <div class="quantity">${price.Amount}</div>
      <p>${price.UnitPriceSilver / 10000} silver</p>
    </div>
  `;
}

function handleDropDownChange(e) {
  /* find the matching prices */
  let matchedPrice = window.prices.filter(p => p.ItemTypeId === e.target.value);

  /* Sort the matching prices */
  matchedPrice = matchedPrice
    .sort((a, b) => parseFloat(a.UnitPriceSilver) - parseFloat(b.UnitPriceSilver));

  /* empty arrays for tracking used to dedupe data*/
  const foundIds = [];
  const finalArray = [];

  /* create a final array of only unique data */
  matchedPrice = matchedPrice.forEach((price, i) => {
    if (foundIds.indexOf(price.Id) === -1) {
      foundIds.push(price.Id);
      finalArray.push(price);
    }
  });

  let pricesLayout = '';
  finalArray.forEach((price, i) => pricesLayout += layoutFromPrice(price));
  document.getElementById('price-value').innerHTML = pricesLayout;
}

export default function searchScript(itemNameMap, prices) {
  return `
    <script>
      var itemNameMap = ${JSON.stringify(itemNameMap)};
      window.prices = ${JSON.stringify(prices)};
      window.layoutFromPrice = ${layoutFromPrice};
      document.addEventListener("change", ${handleDropDownChange});
    </script>
  `
}
