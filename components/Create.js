import React, {Component} from 'react'
import '../styles/_create.scss';

/**
 * Register component.
 * Represents the registration page content.
 */
class Create extends React.Component {
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
                    <h2>Create Stream</h2>
                    <div className="form-group-lg">      
                      <input type="text" className="form-control" id="email" placeholder="Email" />
                    </div>

                    <div className="form-group-lg">
                      <input type="password" className="form-control" id="password" placeholder="Password" />
                    </div>  
                    <button type="button" className="btn btn-lg btn-block">Submit</button> 
                </div>
            </div>

          </div>  

      </div>
    );
  }
}

export default Create;
