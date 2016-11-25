import React, { Component } from 'react'
import io from 'socket.io-client';

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

    // Bind local functions
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.socketListeners = this.socketListeners.bind(this); 
    
    // Set up sockets
    this.socket = io('http://localhost:3333');
    
    // Set up initial state
    this.state = {
      messages: [],
      message: ""
    };

    this.socketListeners();

  }

  socketListeners() {
    
    console.log('hi');

    this.socket.on('connect', function () {
      console.log("You are connected to chat x")
    });
    
    this.socket.on('welcome', function (data) {
      console.log(data);
    });

    this.socket.on('disconnect', function () {
      console.log("bye-bye...")
    });

    var that = this;
    this.socket.on('newMessage', function (data) {
      that.addMessage(data);
    });

  }

  addMessage(data) {
    var messages = this.state.messages;
    messages.push(data);
    this.setState({ messages });
  }

  sendMessage(e) {
    this.socket.emit(`newMessage`, this.state.message);
    this.setState({
      message: ""
    });
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  render() {

    const messages = this.state.messages.map((message, key) => {
      return (<div className="message" key={key}>{message}</div>);
    });

    return (
      <div className="container">
        <br />
        <div className="message-list">
          {messages}
        </div>
        Enter your message: 
        <input
          type="text"
          value={this.state.message}
          onChange={this.handleChange}
          />
        <br />
        <button className="btn btn-default" onClick={this.sendMessage}>Send</button>
      </div>
    );
  }
}

export default Chat;
