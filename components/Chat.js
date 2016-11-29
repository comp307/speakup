import React, { Component } from 'react'
import io from 'socket.io-client';
import config from '../api/config.js';

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

    var session = this.props.sessionData;
    if (session && session.user && session.streamID) {
      // Set up sockets
      var params = { query: "user=" + session.user + "&streamID=" + session.streamID };
      this.socket = io(config.api, params);
    } else {
      console.error("Unable to connect to server at http://localhost:8080!");
    }

  }

  componentDidMount() {

    this.socket.on('connect', function () {
      console.log("You are connected to Chat X");
    });

    this.socket.on('disconnect', function () {
      console.log("You are disconnected from Chat X");
    });

  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    return (
      <div className="chat-page">
        <div className="container">
          <div className="chat-wrapper">
            <div className="row">
              <div className="col-sm-3 col-md-3">
                <UserList
                  socket={this.socket}
                  sessionData={this.props.sessionData}
                  />
              </div>
              <div className="col-sm-9 col-md-9">
                <ChatBox
                  user={this.props.sessionData.user}
                  socket={this.socket}
                  sessionData={this.props.sessionData}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
