'use strict';
/**
 * Listens for new socket connections
 * @param {object} http - reference to http server
 */
function Socket(http) {
  let io = require('socket.io')(http);
  let streams = [{
   id: '2',
   messages: [],
   users: [],
  },
  {
    id: '5',
    messages: [],
    users: [],
  }];

  io.on('connection', function(socket) {
      let handshakeData = socket.request;
      let user = handshakeData._query['user'];
      let streamID = handshakeData._query['streamID'];

      // If stream ID was not passed create a new stream
      if (!streamID) {
        streamID = '123'; // generate a random ID here
        streams.push({
          id: streamID,
          messages: [],
          users: [],
        });
      }

      // Add socket to a "room"
      socket.join(streamID);

      streams.forEach(function(stream) {
        if (stream.id === streamID) {
          // Add user to stream
          if (stream.users.indexOf(user) < 0) {
            console.log(user + ' connected to stream #' + streamID);
            stream.users.push(user);
          }

          // Send user list and message list to connected user
          socket.emit('welcome', stream.messages);
          io.to(streamID).emit('userList', stream.users);


          // Listen for new messages and broadcast them to the room
          socket.on('newMessage', function(msg) {
            stream.messages.push(msg);
            io.to(streamID).emit('newMessage', msg);
          });

          // Listen for disconnections and remove users from the list
          socket.on('disconnect', function() {
            console.log('User ' + user + ' has disconnected!');
            let index = stream.users.indexOf(user);
            stream.users.splice(index, 1);
            io.to(streamID).emit('userList', stream.users);
          });
        }
      });
  });
}

module.exports.Socket = Socket;
