import React, {Component} from 'react'
import { Link } from 'react-router'
import '../styles/_header.scss';

/**
 * Header component.
 * Used to display the header section on all pages of the application
 */
class Header extends Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);

  }

  logout() {
    // Clear session
    this.props.onSessionUpdate(null);
  }

  render() {

    var dynamicButton = "";
    if (this.props.session) {
      dynamicButton = <li><a href="#" onClick={this.logout}>Logout</a></li>;
    } else {
      dynamicButton = <li><Link to="/register">Register</Link></li>;
    }

    return (
      <header>
        <div className="navbar">
          <div className="container">
          <div className="navbar-header">
              <h1>Speakup <small>boiii</small> </h1>
            </div>
            <ul className="nav navbar-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/">About</Link></li>
              <li><Link to="/">Contact</Link></li>
              {dynamicButton}
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;