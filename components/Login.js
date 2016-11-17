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
          <div className="jumbotron">
            <h2>Ask Questions Anonymously</h2>
            <p>Join a lecture stream or start your own. Text about app.. </p>
          </div>

        <div className="row">
          <div className="col-md-6">
              <h2>Create Stream</h2>
              <div className="form-group">
                <input type="text" className="form-control" id="username" placeholder="Username" />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" id="password" placeholder="Password" />
              </div>  
          </div>

          <div className="col-md-6">
            <h2>Join Stream</h2>
            <div className="form-group">      
              <input type="text" className="form-control" id="username" placeholder="Username" />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" id="password" placeholder="Password" />
            </div>  
            <div className="form-group">
              <input type="text" className="form-control" id="streamID" placeholder="Stream ID" />
            </div>  
          </div>
          
        </div>
      </div>    
    );
  }
}

export default Login; 
