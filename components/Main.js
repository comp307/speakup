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
      <div className="main-page">
            <div className="row">
              <section className="login-section">
                  <div className="login-box">
                    <div className="panel-body  text-center">
                      <Link to="/create" className="btn btn-speakup" role="button">Create Lecture <span className="glyphicon glyphicon-share-alt"></span></Link>
                      <div className="padding-v10">OR</div>
                      <Link to="/join" className="btn btn-speakup" role="button">Join Lecture <span className="glyphicon glyphicon-share-alt"></span></Link>
                    </div>
                    <p>Don't have an account? <Link to="/register">Register here.</Link></p>
                </div>
              </section>
            </div>

            <div className="row">
              <section className="about-section">
                <div className="container">
                  <section className="jumbotron">
                    <h2>Ask questions anonymously</h2>
                    <p>Speakup is McGill's first and only web application that facillitates student-professor communication during live lectures. Join a lecture question stream or start your own.
                    Literally tens of students and faculty are already using Speakup</p>
                  </section>
                </div>
              </section>
            </div>

            <div className="row">
              <section className="contact-section">
                <div className="container">
                  <section className="jumbotron">
                    <p>People</p>
                  </section>
                </div>
              </section>
            </div>

      </div>
    );
  }
}

export default Main;
