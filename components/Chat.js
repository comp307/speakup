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

    this.onSetName = this.onSetName.bind(this);

    let session = this.props.sessionData;
    if (session && session.user && session.streamID) {
      // Set up sockets
      let params = {
        query: "user=" + session.user +
        "&streamID=" + session.streamID +
        "&streamName=" + session.streamName
      };
      this.socket = io(config.api, params);
    } else {
      console.error("Unable to connect to server at http://localhost:8080!");
    }

    this.state = {
      sessionData: session
    };

  }

  componentDidMount() {

    let session = this.props.sessionData;

    this.socket.on('connect', function () {
      this.socket
        .emit('authenticate', { token: session.token })
        .on('authenticated', function () {
          console.log("You are connected to Stream " + session.streamID);
        })
        .on('unauthorized', function (msg) {
          console.log("Unauthorized: " + JSON.stringify(msg.data));
          throw new Error(msg.data.type);
        })
    }.bind(this));

    this.socket.on('username', function (username) {
      let sessionData = this.state.sessionData;
      sessionData.user = username;
      this.setState({
        sessionData
      })
    }.bind(this));

    this.socket.on('disconnect', function () {
      console.log("You are disconnected from Chat X");
    });

  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  /**
   * Receives stream name from the child component
   * and updates session data
   *
   * @param {string} streamName - the name of the current stream
   */
  onSetName(streamName) {
    let sessionData = this.state.sessionData;
    sessionData.streamName = streamName;
    this.setState({sessionData});
  }

  render() {
    return (
      <div className="chat-page">
        <div className="container">
          <h1>Welcome to {this.state.sessionData.streamName} stream!</h1>
          <div className="chat-wrapper">
            <div className="row">
              <div className="col-sm-2 col-md-2">
                <UserList
                  socket={this.socket}
                  sessionData={this.state.sessionData}
                  />
              </div>
              <div className="col-sm-10 col-md-10">
                <ChatBox
                  socket={this.socket}
                  sessionData={this.state.sessionData}
                  setChatName={this.onSetName}
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
