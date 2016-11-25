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

      <div className="navbar">
        <div className="container">
         <div className="navbar-header">
             <h1>Speakup <small>boiii</small> </h1>
          </div>
          <ul className="nav navbar-nav">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">About</Link></li>
                    <li><Link to="/">Contact</Link></li>
          </ul>
        </div>
      </div>
 /*<div className="header-title">
        <div className="container">
      
          <ul className="nav navbar-nav">
          <h1>Speakup <small>boiii</small> </h1>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/">About</Link></li>
              <li><Link to="/">Contact</Link></li>
          </ul>          
        </div>        
      </div>*/
    );
  }
}

export default Header;