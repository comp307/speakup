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

    this.handleClick = this.handleClick.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      dropdownShown: false
    };

  }

  handleClick() {
    let dropdownShown = !this.state.dropdownShown;
    this.setState({dropdownShown});
  }

  logout() {
    // Clear session
    this.props.onSessionUpdate(null);
  }

  render() {

    let dynamicButton = <Link to="/register">Register</Link>;
    // If logged in, replace register btn, by logout btn
    if (this.props.session && this.props.session.user) {
      dynamicButton = <a href="#" onClick={this.logout}>Logout</a>;
    }

    return (
      <header>
        <div className="navbar navbar-fixed-top" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">
                <h1><i className="fa fa-paper-plane" aria-hidden="true"></i> Speakup</h1>
              </Link>
              <ul className="nav navbar-nav navbar-right">
                <li>{dynamicButton}</li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;