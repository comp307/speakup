import React, {Component} from 'react'
import '../styles/_register.scss';

/**
 * Register component.
 * Represents the registration page content.
 */
class Register extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
          <div className="container">

            <div className="row">
                <div className="col-md-6">
                    <h2>Professor Account</h2>
                    <div className="form-group">
                        <input type="text" className="form-control" id="username" placeholder="Username" />
                    </div>

                    <div className="form-group">
                        <input type="password" className="form-control" id="password" placeholder="Password" />
                    </div>  
                </div>

                <div className="col-md-6">
                    <h2>Student Account</h2>
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
      </div>
    );
  }
}

export default Register;
