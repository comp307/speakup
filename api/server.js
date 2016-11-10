var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var messages = {};

app.get('/users', function(req, res){
  res.sendfile('../index.html');
});

// app.use("/styles", express.static('../styles'));

io.on('connection', function(socket) {


    console.log('a user connected');
    socket.emit('welcome', 'hi from the server');

    socket.on('newMessage', function(msg) {
        console.log(msg);
        io.sockets.emit('newMessage', msg);        
    });
});



http.listen(3333, function(){
  console.log('listening on *:3333');
});