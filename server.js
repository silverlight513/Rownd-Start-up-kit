var express = require('express');
var app = express();

// Host the assets directory
app.use('/assets', express.static(__dirname + '/dist/assets/'));

var router = express.Router();

// Host the Rownd application on the root page
router.route('*').get(function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.use('/', router);

var port = process.argv[2] || '2020';

var server = app.listen(port, '127.0.0.1', function() {
  var address = server.address();
  var host = address.address;
  var port = address.port;

  console.log(`Rownd app running on http://${host}:${port}`);
});