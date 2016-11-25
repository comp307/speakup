import React, {Component} from 'react'
import { Link } from 'react-router'
import '../styles/_main.scss';

/**
 * Main component.
 * Represents the contents of the default page
 */
class Main extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main">

      <div className="container">
        <div className="jumbotron">
          <h2>Ask questions anonymously</h2>
          <p>Speakup is McGill's first and only web application that facillitates student-professor communication during live lectures. Join a lecture question stream or start your own. 
          Literally tens of students and faculty are already using Speakup</p>
        </div>

          <div className="row">
            <div className="col-md-4 col-md-offset-4">
              <div className="panel panel-default">
                <div className="panel-body  text-center">
                  <Link to="/create" className="btn " role="button">Create Lecture <span className="glyphicon glyphicon-share-alt"></span></Link>
                  <p id="or"> OR</p>
                  <Link to="/join" className="btn  " roll="button">Join Lecture <span className="glyphicon glyphicon-share-alt"></span></Link>
                  
              </div>
              <p> Don't have an account? <Link to="/register">Register here.</Link></p>
            </div>
              
            </div>
          </div>
        </div>
      </div>   
    );
  }
}

export default Main;
