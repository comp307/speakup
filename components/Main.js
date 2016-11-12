import React, {Component} from 'react'
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
      <div className="container">

          <div className="jumbotron">
            <h2>Ask Questions Anonymously</h2>
            <p>Join a lecture stream or start your own. Text about app.. </p>
          </div>

          <div className="row">
            <div className="col-md-4 col-md-offset-4">
              <button type="button" className="btn btn-xl btn-block">Create Lecture <span className="glyphicon glyphicon-share-alt"></span></button>
              <button type="button" className="btn btn-xl btn-block">Join Lecture <span className="glyphicon glyphicon-share-alt"></span></button>
              <button type="button" className="btn btn-xl btn-block">Register <span className="glyphicon glyphicon-share-alt"></span></button>
            </div>
          </div>
          

      </div>   
    );
  }
}

export default Main;
