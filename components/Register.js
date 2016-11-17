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


                <div className="col-md-4 col-md-offset-4">
                    <h2>Registration</h2>
                    <div className="form-group">      
                      <input type="text" className="form-control" id="email" placeholder="Email" />
                    </div>

                    <div className="form-group">
                      <input type="password" className="form-control" id="password" placeholder="Password" />
                    </div>  

                    <div className="form-group">
                      <input type="password" className="form-control" id="password" placeholder="Confirm password" />
                    </div> 

                    <div className="form-group">
                      <input type="text" className="form-control" id="streamID" placeholder="Stream ID" />
                    </div> 
                    <button type="button" className="btn btn-lg btn-block">Submit</button> 
                </div>
            </div>

          </div>
      </div>
    );
  }
}

export default Register;
