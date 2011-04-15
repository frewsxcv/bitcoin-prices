const Widget = require("widget").Widget;
const Request = require("request").Request;
const setInterval = require("timer").setInterval;
const activeTab = require("tabs").activeTab;

var BitcoinWidget = Widget({
   label: "Current Bitcoin price",
   content: "<div style='font-size:12px'>$N/A</div>",
   width: 55,
   onClick: function() {
      activeTab.url = "http://bitcoincharts.com/markets/";
      update();
   }
});

function update() {
   Request({
      url: "http://bitcoincharts.com/t/weighted_prices.json", 
      onComplete: function (response) {
         var usd = response.json.USD["24h"];
         usd = Math.round(usd*1000)/1000;
         BitcoinWidget.content = "<div style='font-size:12px'>$" + usd + "</div>";
      }
   }).get();
}

update();
setInterval(update(), 300000); // rerun every 5 mintues 
