import React, {Component} from 'react'
import '../styles/_login.scss';

/**
 * Login Component.
 * Represents the login page content
 */
class Login extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <h3>Login</h3>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" id="username" placeholder="Username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" />
          </div>          
          <button type="submit" className="btn btn-default">Login</button>
        </form>
        
      </div>      
    );
  }
}

export default Login; 
