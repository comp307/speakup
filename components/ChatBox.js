import React, {Component} from 'react';
import '../styles/_chat.scss';

/**
 * ChatBox component.
 */
class ChatBox extends Component {

  constructor(props) {
    super(props);

    // Bind local functions
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.addMessage = this.addMessage.bind(this);

    // Set up initial state
    this.state = {
      messages: [],
      message: '',
    };
  }

  componentDidMount() {
    // Initilize messages
    this.props.socket.on('welcome', function(data) {
      this.props.setChatName(data.name);
      this.setState({
        messages: data.messages,
      });
    }.bind(this));

    // Add new messages
    this.props.socket.on('newMessage', function(data) {
      this.addMessage(data);
    }.bind(this));
  }

  componentDidUpdate() {
    // Scroll message list to the bottom
    const messageContainer = this.refs.messageList;
    if (messageContainer) {
      const containerHeight = messageContainer.scrollHeight;
      messageContainer.scrollTop = containerHeight;
    }
  }

  /**
   * Add new message
   */
  addMessage(data) {
    let messages = this.state.messages;
    messages.push(data);
    this.setState({
      messages,
      message: '',
    });
  }

  /**
   * Send the message to the server
   * Invoked either by pressing Send button
   * or pressing Enter/Return key
   *
   * @param {event} e - key/button press
   */
  sendMessage(e) {
    // Check for return key
    if (e.target.id === 'input-msg') {
      if (e.key !== 'Enter') {
        return;
      }
    }

    let newMessage = {
      message: this.state.message,
      user: this.props.sessionData.user,
      streamID: this.props.sessionData.streamID,
      time: Date.now(),
    };

    this.props.socket.emit('newMessage', newMessage);
  }

  /**
   * Update input value
   */
   handleChange(e) {
    this.setState({
      message: e.target.value,
    });
  }

  render() {
    const messages = this.state.messages.map((message, key) => {
      let messageTime = new Date(message.time).toLocaleTimeString();
      return (
        <div className="message" key={key}>
          <div className="message__meta">
            <span className="message__user">{message.user}</span>
            <span className="message__time">{messageTime}</span>
          </div>
          <div className="message__text">{message.message}</div>
        </div>
      );
    });

    return (
      <div className="chat-box">
        <div className="message-list" ref="messageList">
          {messages}
        </div>
        <div className="input-group input-box">
          <input
            id="input-msg"
            type="text"
            value={this.state.message}
            onChange={this.handleChange}
            className="form-control"
            onKeyUp={this.sendMessage}
            />
          <div className="input-group-btn">
            <button
              id="btn-send"
              className="btn btn-speakup btn-send"
              onClick={this.sendMessage}
            >
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatBox;
