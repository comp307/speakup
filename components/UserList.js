import React, {Component} from 'react';
import '../styles/_chat.scss';

/**
 * UserList component.
 */
class UserList extends Component {

  constructor(props) {
    super(props);

    let self = this;

    this.state = {
      users: [],
    };

    // Initilize messages
    this.props.socket.on('userList', function(data) {
      self.setState({
        users: data,
      });
    });
  }

  render() {

    const users = this.state.users.map((user, key) => {
      return (<li key={key}>{user}</li>);
    });

    return (
      <div className="users-list">
        <div className="users-list__header">
          <h3>10 Users Online</h3>
          <ul>
            {users}
          </ul>
        </div>
        <div className="users-list__content">

        </div>
      </div>
    );
  }
}

export default UserList;
