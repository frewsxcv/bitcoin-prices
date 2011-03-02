const Widget = require("widget").Widget;
const Request = require("request").Request;

var BitcoinWidget = Widget({
   label: "Current Bitcoin price",
   content: "$1.00",
   width: 50,
   onClick: function() {

      console.log("Add-on has been clicked.");

      Request({
         url: "http://mtgox.com/code/data/ticker.php",
         onComplete: function (response) {
            BitcoinWidget.content = "$" + response.json.ticker.buy;
         }
      }).get();
   }
});

console.log("The add-on is running.");
