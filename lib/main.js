const Widget = require("widget").Widget;
const Request = require("request").Request;
const setInterval = require("timer").setInterval;
const activeTab = require("tabs").activeTab;

var BitcoinWidget = Widget({
   label: "Current Bitcoin price",
    id: "bitcoin-price-widget",
    content: "<div style='font-size:12px'>$N/A</div>",
    width: 55,
    onClick: function() {
       activeTab.url = "http://bitcoincharts.com/markets/";
       updatePrice();
    }
});

function updatePrice() {
   Request({
      url: "https://mtgox.com/code/data/ticker.php",
      onComplete: function (response) {
         price = response.json.ticker["buy"];
         price = Math.round(price*100)/100;
         BitcoinWidget.content = "<div style='font-size:12px'>$" + price + "</div>";
      }
   }).get();
}

setInterval(updatePrice(), 4 * 60 * 1000); // rerun every 4 mintues 
