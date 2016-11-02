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
          <h2>Speak Up</h2>
          <nav>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
          </nav>            
        </div>        
      </header>
    );
  }
}

export default Header;