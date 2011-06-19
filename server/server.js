var cradle = require('cradle');
var https = require('https');

var db = new(cradle.Connection)().database('mtgox');

db.exists(function (err, res) {
   if (!res) {
      db.create();
   }
})

newPrice();
setInterval(newPrice, 1*60*1000);

function newPrice() {
   https.get({ 
      host: 'mtgox.com',
      path: '/code/data/ticker.php',
   }, function(res) {
      res.on('data', function(d) {
         var ticker = JSON.parse(d.toString("utf8")).ticker;
         save(ticker);
      });
   }).on('error', function(e) {
      console.error(e);
   });
}

function save(ticker) {
   /* save()
    * save a ticker object into the database
    */
   var time = new Date().getTime() + "";
   db.save(time, ticker, function (err, res) {
      if (err) {
         console.log("--time " + time + " unsuccessful--");
      } else {
         console.log("time " + time + " successful");
      }
   });
}

/*
   db.get('vader', function (err, doc) {
   doc.name; // 'Darth Vader'
   assert.equal(doc.force, 'dark');
   });
   */
