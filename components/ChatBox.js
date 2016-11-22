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
      message: ''
    };
  }

  componentDidMount() {
    let self = this;

    // Initilize messages
    this.props.socket.on('welcome', function(data) {
      self.setState({
        messages: data,
      });
    });

    // Add new messages
    this.props.socket.on('newMessage', function(data) {
      self.addMessage(data);
    });
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
   */
  sendMessage(e) {
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
          {message.message}
        </div>
      );
    });

    return (
      <div className="chat-box">
        <div className="message-list">
          {messages}
        </div>
        <div className="input-group input-box">
          <input
            type="text"
            value={this.state.message}
            onChange={this.handleChange}
            className="form-control"
            />
          <div className="input-group-addon">
            <button
              className="btn btn-default btn-send"
              onClick={this.sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatBox;
