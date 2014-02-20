(function () {
    "use strict";

    const Widget = require("sdk/widget").Widget;
    const Request = require("sdk/request").Request;
    const Panel = require("sdk/panel").Panel;
    const setInterval = require("sdk/timers").setInterval;
    const data = require("sdk/self").data;

    const sparklineWidget = new Widget({
        label: "Last 24 hours of Bitcoin prices (MtGox USD)",
        id: "bitcoin-sparkline",
        contentURL: data.url("widgets/sparkline.html"),
        width: 80,
    });

    const priceWidget = new Widget({
        label: "Last Bitcoin price (MtGox USD)",
        id: "bitcoin-price",
        contentURL: data.url("widgets/price.html"),
        width: 45,
        onClick: function() {
            update();
        }
    });

    const update = function () {
        (new Request({
            url: "https://bitcoin-prices.herokuapp.com/api/v1/coinbase/usd/24h",
            onComplete: function (res) {
                var prices = [];
                res.json.prices.forEach(function (price) {
                    prices.push(price.p);
                }); 
                sparklineWidget.port.emit('update', prices);
                priceWidget.port.emit('update', prices);
            }
        })).get();
    };

    sparklineWidget.port.on('mouseleave', function () {
        priceWidget.port.emit('mouseleave');
    });

    sparklineWidget.port.on('mouseover', function (price) {
        priceWidget.port.emit('mouseover', price);
    });

    update();
    setInterval(update, 10 * 60 * 1000); // rerun every 10 mintues
}());
