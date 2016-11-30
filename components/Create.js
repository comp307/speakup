import React, {Component} from 'react';
import {Link} from 'react-router';
import config from '../api/config.js';

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
      errors: {
        'email': false,
        'password': false,
        'stream_id': false,
        'stream_name': false,
      },
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
    let isValid = this.validateInput(formElement, value);

    if (!isValid) {
      return;
    }

    formData[formElement] = value;
    this.setState({formData});
  }

  validateInput(formElement, value) {
    let isValid = true;
    let errors = this.state.errors;

    if (!value) {
      errors[formElement] = 'The ' + formElement + ' is required!';
      isValid = false;
    } else {
      errors[formElement] = false;
    }

    this.setState({errors});

    return isValid;
  }

  handleSubmit() {
    let url = config.api + '/api/auth/';
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
            streamName: formData['stream_name'],
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
          swal({
            'title': 'Oops!',
            'text': response.message,
            'type': 'error',
          });
        }
      }
    }.bind(this);
    xhr.onerror = function(err) {
      console.error(err);
    };
    xhr.send(JSON.stringify(formData));
  }


  render() {

    let defaultClass = 'form-group-lg';
    let errors = this.state.errors;
    let fieldClasses = {};

    // Initilize field classes based on error state
    Object.keys(errors).map(function(key) {
      if (errors[key]) {
        fieldClasses[key] = defaultClass + ' has-error';
      } else {
        fieldClasses[key] = defaultClass;
      }
    });

    return (
      <div className="create-page">
        <div className="container">
          <div className="form-box">
            <h2>Create Stream</h2>
            <div className={fieldClasses['email']}>
              <input type="email" className="form-control" name="email" placeholder="Email" onBlur={this.onUserInput} />
              <span id="email-help" className="help-block">
                {errors['email']}
              </span>
            </div>
            <div className={fieldClasses['password']}>
              <input type="password" className="form-control" name="password" placeholder="Password" onBlur={this.onUserInput} />
              <span id="password-help" className="help-block">
                {errors['password']}
              </span>
            </div>
            <div className={fieldClasses['stream_name']}>
              <input type="text" className="form-control" name="stream_name" placeholder="Stream Name" onBlur={this.onUserInput} />
              <span id="stream_name-help" className="help-block">
                {errors['stream_name']}
              </span>
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
