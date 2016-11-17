const express = require('express');
const app = express();
const http = require('http').Server(app);
require('./sockets.js').Socket(http);

http.listen(3333, function() {
  console.log('Listening on *:3333');
});
