const Widget = require("widget").Widget;
const Request = require("request").Request;
const setInterval = require("timer").setInterval;

console.log("The add-on is running.");

var BitcoinWidget = Widget({
   label: "Current Bitcoin price",
   content: "$N/A",
   width: 55,
   onClick: updatePrice, 
});

updatePrice;
setInterval(updatePrice,300000); // rerun every 5 mintues 

function updatePrice() {
   Request({
      url: "http://bitcoincharts.com/t/markets.json",
      onComplete: function (response) {
         var total = 0;
         var count = 0;
         var markets = response.json
         for (var x in markets) {
             if (markets[x].currency == "USD" && markets[x].ask) {
                 total += markets[x].ask;
                 count++;
             }
         }
         price = total/count;
         BitcoinWidget.content = "$" + price;
      }
   }).get();
}
