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
                      <span className="speakup-title">Speakup</span> is McGill's first and only web application that facillitates student-professor communication during live lectures.
                    </p>
                      <h3>Ask questions anonymously</h3>
                    <p>
                      Many classroom settings can be loud or intimidating making it difficult to participate in class. <span className="speakup-title">Speakup</span> provides students with a direct line of communication to the professor
                      using a chat room interface. All participating users may pose questions or provide input in total anonymity.
                    </p>
                    <h3>How it works</h3>
                    <p>
                      Upon selecting the create lecture option, a new lecture stream is created automatically. Students 
                      join the stream by inputting its identification number. Once joined, inquirers may write messages to the question stream for all to view.
                      The etc..
                    </p>
                    <h3>Multi-purposeness</h3>
                    <p>
                      Anyone can start a lecture stream. Etc...
                    </p>
                    <div className="clear" />
                </section>
                </div>
              </section>
            </div>

            <div className="row">
              <section className="contact-section">    
                <a name="contact"></a>
                <div className="container">
                              <h2>Contact Us</h2>
                  <div className="col-sm-4">
                    <div className="centre-circle">
                      <div className="circle">
                        <i className="fa fa-hand-paper-o" aria-hidden="true" ></i>
                      </div>
                    </div>
                    <div className="creater-info">
                      <p>Maksim Bober</p><p><i className="fa fa-envelope" aria-hidden="true"></i> maksim.bober@mail.mcgill.ca</p>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="centre-circle">                    
                      <div className="circle">
                        <i className="fa fa-hand-peace-o" aria-hidden="true"></i>
                      </div>
                    </div>
                    <div className="creater-info">
                      <p>Alex Ilea</p>
                      <p><i className="fa fa-envelope" aria-hidden="true"></i> alexander.ilea@mail.mcgill.ca</p>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="centre-circle"> 
                      <div className="circle">
                        <i className="fa fa-hand-rock-o" aria-hidden="true"></i>
                      </div>
                    </div>
                    <div className="creater-info">
                      <p>Dale Mowbray</p>
                      <p><i className="fa fa-envelope" aria-hidden="true"></i> dale.mowbray@mail.mcgill.ca</p>
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
