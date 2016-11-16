"use strict";
/**
 * Listens for new socket connections
 * @param {object} http - reference to http server
 */
function Socket(http) {
  let io = require('socket.io')(http);
  let messages = [];
  let users = [];

  io.on('connection', function(socket) {
      let handshakeData = socket.request;
      let user = handshakeData._query['user'];

      if (user && user !== undefined) {
        console.log(user + ' connected');
        if (users.indexOf(user) < 0) {
          users.push(user);
        }
        socket.emit('welcome', messages);
        io.sockets.emit('userList', users);
      }

      socket.on('newMessage', function(msg) {
          messages.push(msg);
          io.sockets.emit('newMessage', msg);
      });


      socket.on('disconnect', function() {
        console.log('User ' + user + ' has disconnected!');
        let index = users.indexOf(user);
        users.splice(index, 1);
        io.sockets.emit('userList', users);
      });

  });
}

module.exports.Socket = Socket;
