import React, {Component} from 'react';
import {Link} from 'react-router';
import '../styles/_create.scss';

/**
 * Register component.
 * Represents the registration page content.
 */
class Create extends React.Component {

  constructor(props) {
    super(props);

    this.onUserInput = this.onUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      loginSuccess: false,
      formData: {},
      errors: {},
    };
  }

  /**
   * Set the form data based on input values
   *
   * @param {object} e - change event
   */
  onUserInput(e) {
    let value = e.target.value;
    let formElement = e.target.name;
    let formData = this.state.formData;

    formData[formElement] = value;
    this.setState({
      formData: formData,
    });
  }

  handleSubmit() {
    let url = 'http://localhost:8080/api/auth/';
    let formData = this.state.formData;

    // Send AJAX request
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onreadystatechange = function() {
      if (xhr.readyState > 3 && xhr.status == 200) {
        let response = JSON.parse(xhr.responseText);
        console.log(response);
        if (response.success) {
          let sessionData = {
            user: formData['email'],
            streamID: response.streamID,
            token: response.token,
          };

          this.props.onSessionUpdate(sessionData);

          if (this.props.sessionData) {
            let chatURL = '/chat/' + this.props.sessionData.streamID;
            let router = this.props.router;
            let redirect = router.createLocation(chatURL);
            router.push(redirect);
          }
        } else {
          let errors = this.state.errors;
          errors['name'] = response.message;
        }
      }
    }.bind(this);
    xhr.onerror = function(err) {
      console.error(err);
    };
    xhr.send(JSON.stringify(formData));
  }


  render() {
    return (
      <div className="create-page">
        <div className="container">
          <div className="form-box">
            <h2>Create Stream</h2>
            <div className="form-group-lg">
              <input type="email" className="form-control" name="email" placeholder="Email" onChange={this.onUserInput} required />
            </div>
            <div className="form-group-lg">
              <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.onUserInput} required />
            </div>
            <button type="button" className="btn btn-speakup" onClick={this.handleSubmit}>Create Stream</button>
            <p>Don't have an account? <Link to="/register">Register here.</Link></p>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
