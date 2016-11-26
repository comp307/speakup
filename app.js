import React from 'react';
import Alert from 'sweetalert';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

// Core
import Header from './components/Header';
import Footer from './components/Footer';

// Page contents
import Main from './components/Main';
import Chat from './components/Chat';
import Register from './components/Register';
import Join from './components/Join';
import Create from './components/Create';

// Stylesheets
import './styles/app.scss';

/**
* App component.
* A wrapper for the whole application
*/
class App extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);

    var sessionData = {
      user: localStorage.getItem('user'),
      streamID: localStorage.getItem('streamID'),
      token: localStorage.getItem('token')
    };


    this.setSession = this.setSession.bind(this);
    this.state = {
      session: sessionData
    }

  }

  setSession(session) {

    if (session === null) {
      // Clear localStorage
      localStorage.clear();
      // Redirect to main page
      var router = this.props.router;
      var redirect = router.createLocation('/');
      router.push(redirect);
    }

    if (session && session.user && session.token && session.streamID) {
      localStorage.setItem('user', session.user);
      localStorage.setItem('token', session.token);
      localStorage.setItem('streamID', session.streamID);
    }

    this.setState({session});
  }

  render() {
    return (
      <div className="page-wrapper">
        <Header session={this.state.session} onSessionUpdate={this.setSession}/>
        <div className="page-content">
          {this.props.children && React.cloneElement(this.props.children, {
            onSessionUpdate: this.setSession,
            sessionData: this.state.session
          })}
        </div>
        <Footer />
      </div>
    );
  }
}

function requireAuth(nextState, replace) {

  const loggedIn = localStorage.getItem('token');

  if (loggedIn === null) {
    replace('/');
  }
}

/**
 * The router render App component declared above.
 * Then it checks for subroutes and decides which component
 * to render based on subroute URL.
 <Route path="*" component={Home}/> */
ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Main}/>
      <Route path="/chat/:chatId" component={Chat} onEnter={requireAuth}/>
      <Route path="/register" component={Register}/>
      <Route path="/join" component={Join}/>
      <Route path="/create" component={Create}/>
    </Route>
  </Router>
), document.getElementById('page-root'));
