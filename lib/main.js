const Widget = require("widget").Widget;
const Request = require("request").Request;
const setInterval = require("timer").setInterval;

console.log("The add-on is running.");

var BitcoinWidget = Widget({
   label: "Current Bitcoin price",
   content: "$N/A",
   width: 50,
   onClick: updatePrice, 
});

updatePrice;
setInterval(updatePrice,300000); // rerun every 5 mintues 

function updatePrice() {
   Request({
      url: "http://mtgox.com/code/data/ticker.php",
      onComplete: function (response) {
         var price = response.json.ticker.buy.toFixed(2);
         BitcoinWidget.content = "$" + price;
      }
   }).get();
}
