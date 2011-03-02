const Widget = require("widget").Widget;
const Request = require("request").Request;

console.log("The add-on is running.");

updatePrice();

var BitcoinWidget = Widget({
   label: "Current Bitcoin price",
   content: "$1.00",
   width: 50,
   onClick: updatePrice, 
});

function updatePrice() {
   console.log("Updating price.");
   Request({
      url: "http://mtgox.com/code/data/ticker.php",
      onComplete: function (response) {
         var price = response.json.ticker.buy.toFixed(2);
         console.log("Price: " + price);
         BitcoinWidget.content = "$" + price;
      }
   }).get();
}
