'use strict';

const socketioJwt = require('socketio-jwt');
const config = require('./config');

/**
 * Listens for new socket connections
 * @param {object} http - reference to http server
 */
function socket(http) {
  let io = require('socket.io')(http);
  let usernames = ['Zeus', 'Hera', 'Poseidon', 'Demeter', 'Ares', 'Athena', 'Apollo', 'Artemis', 'Hephaestus', 'Aphrodite', 'Hermes', 'Dionysus', 'Hades', 'Hypnos', 'Nike', 'Janus', 'Nemesis', 'Iris', 'Hecate', 'Tyche'];
  let streams = {};
  let users = {};

  io.on('connection', socketioJwt.authorize({
    secret: config.secret,
    timeout: 15000,
  })).on('authenticated', function(socket) {
      let handshakeData = socket.request;
      let streamID = handshakeData._query['streamID'];
      let email = handshakeData._query['user'];
      let streamName = handshakeData._query['streamName'];
      let user = 'Anonymous';

      if (!streamName) {
        streamName = 'Anonymous';
      }

      // Set anonymous username
      if (!users.hasOwnProperty(email)) {
        if (usernames.length > 0) user = usernames.pop();
        users[email] = user;
      } else {
        user = users[email];
      }

      // Create new stream with the given ID
      let isNew = !(streams.hasOwnProperty(streamID));
      if (isNew) {
        streams[streamID] = {
          name: streamName,
          messages: [],
          users: [],
        };
      }

      let stream = streams[streamID];

      // Add socket to a "room"
      socket.join(streamID);

      // Add user to stream
      if (stream.users.indexOf(user) < 0) {
        console.log(user + ' connected to stream #' + streamID);
        stream.users.push(user);
      }

      // Send user list and message list to connected user
      socket.emit('welcome', {
        'messages': stream.messages,
        'name': stream.name,
      });
      socket.emit('username', user);
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
  });
}

module.exports.socket = socket;
