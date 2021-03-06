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
                  <h3>Select an Option</h3>
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
              <a name="about"></a>
                <div className="container">
                <h2>About</h2>
                  <section className="about-info">
                    <p>
                      <span className="speakup-name">Speakup</span> is McGill's first and only web application that facillitates student-professor communication during live lectures.
                    </p>
                      <h3>Ask questions anonymously</h3>
                    <p>
                      Many classroom settings can be loud or intimidating making it difficult to participate in class. <br/>
                      <span className="speakup-name">Speakup</span> provides students with a direct line of communication to the professor without any hassle - or face-to-face communication. 
                      User identity is completely hidden so never again worry about embarrassing yourself in front of peers.
                    </p>
                    <h3>How it works</h3>
                    <p>
                      When a lecture stream is created, a chatroom interface is provided for students to pose questions.
                      Students join by providing the identification number that is assigned to the stream. 
                    </p>
                    <h3>Multi-purposeful</h3>
                    <p>
                      Anyone can start a lecture stream - not just professors. Use <span className="speakup-name">Speakup</span> anywhere!
                    </p>
                </section>
                </div>
              </section>
            </div>

            <div className="row">
              <section className="contact-section">
                <a name="contact"></a>
                <div className="container">
                    <h2>Contact Us</h2>
                  <div className="col-sm-12 col-md-4">
                    <div className="centre-circle">
                      <div className="circle">
                        <a href="https://github.com/Bobrinik" target="_blank">
                          <i className="fa fa-hand-paper-o" aria-hidden="true" ></i>
                        </a>
                      </div>
                    </div>
                    <div className="creater-info">
                      <p><a href="https://github.com/Bobrinik" target="_blank">Maksim Bober</a></p>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4">
                    <div className="centre-circle">
                      <div className="circle">
                        <a href="https://github.com/alisterdev" target="_blank">
                          <i className="fa fa-hand-peace-o" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                    <div className="creater-info">
                      <p><a href="https://github.com/alisterdev" target="_blank">Alex Ilea</a></p>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4">
                    <div className="centre-circle">
                      <div className="circle">
                        <a href="https://github.com/invalidsword" target="_blank">
                          <i className="fa fa-hand-rock-o" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                    <div className="creater-info">
                      <p><a href="https://github.com/invalidsword" target="_blank">Dale Mowbray</a></p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
      </div>
    );
  }
}

export default Main;
