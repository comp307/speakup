import React, { Component } from 'react'
import io from 'socket.io-client';

import UserList from './UserList';
import ChatBox from './ChatBox';


import '../styles/_chat.scss';

/**
 * Chat component.
 * Represents the contents of the chat page
 */
class Chat extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);

    let user = window.localStorage['user'];
    var query = {
      query: "user=" + user
    };

    this.state = {
      user: user
    };

    // Set up sockets
    this.socket = io('http://localhost:3333', query);

    this.socket.on('connect', function () {
      console.log("You are connected to Chat X");
    });

    this.socket.on('disconnect', function () {
      console.log("You are disconnected from Chat X");
    });

  }


  render() {
    return (
      <div className="container">
        <div className="chat-wrapper">
        <div className="row">
          <div className="col-sm-3 col-md-3">
            <UserList
              socket={this.socket}
            />
          </div>
          <div className="col-sm-9 col-md-9">
            <ChatBox
              user={this.state.user}
              socket={this.socket}
            />
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Chat;
