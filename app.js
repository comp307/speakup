import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

// Core
import Header from './components/Header';
import Footer from './components/Footer';

// Page contents
import Login from './components/Login';
import Main from './components/Main';
import Chat from './components/Chat';

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
  }

  render() {
    return (
      <div>
        <Header />  
        <div className="page-content">
          {this.props.children}
        </div>          
        <Footer />    
      </div>
    );
  }
}

/**
 * The router render App component declared above. 
 * Then it checks for subroutes and decides which component 
 * to render based on subroute URL.
 */
ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}> 
      <IndexRoute component={Main}/>     
      <Route path="/login" component={Login}/>
      <Route path="/chat" component={Chat}/>
      <Route path="*" component={Main}/>      
    </Route>
  </Router>
), document.getElementById('page-root'));
