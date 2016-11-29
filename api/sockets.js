'use strict';

const jwt = require('jsonwebtoken'); // create and verify tokens
const config = require('./config');
const streams = [];

/**
 * Listens for new socket connections
 * @param {object} http - reference to http server
 */

function Socket(http) {
  let io = require('socket.io')(http);
  console.log(streams);
  io.on('connection', function (socket) {
    let handshakeData = socket.request;
    let user = handshakeData._query['user'];
    let streamID = handshakeData._query['streamID'];
    let token = handshakeData._query['token'];

let isNew = streams.hasOwnProperty(streamID);
      if (isNew) {
        streams.push({
            id: streamID,
            messages: [],
            users: [],
        });
      };


    if (token) {
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
          //to-do send error to user
          console.log('error');
        }
        else {
          if (!streamID) {
            streamID = streams.lenght+1; 
            streams.push({
              id: streamID,
              messages: [],
              users: [],
            });
          }
        }
      })
    }
  
  
  //Optimization for this is to do dictionary
    streams.forEach(function (stream) {
      if (stream.id === streamID) {
        socket.join(streamID);
        // Add user to stream
        if (stream.users.indexOf(user) < 0) {
          console.log(user + ' connected to stream #' + streamID);
          stream.users.push(user);
        }

        // Send user list and message list to connected user
        socket.emit('welcome', stream.messages);
        io.to(streamID).emit('userList', stream.users);


        // Listen for new messages and broadcast them to the room
        socket.on('newMessage', function (msg) {
          stream.messages.push(msg);
          io.to(streamID).emit('newMessage', msg);
        });

        // Listen for disconnections and remove users from the list
        socket.on('disconnect', function () {
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
