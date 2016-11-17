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
  }

  render() {
    return (
      <header className="header">
        <div className="container">
          <h1>Speakup <small>boiii</small> </h1>
        <ul className="nav navbar-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create">Create Lecture</Link></li>
            <li><Link to="/join">Join Lecture</Link></li>
            <li><Link to="/register">Register</Link></li>
        </ul>          
        </div>        
      </header>
    );
  }
}

export default Header;