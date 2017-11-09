export default function searchScript(itemNameMap, prices) {
  return `
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
  `
}
