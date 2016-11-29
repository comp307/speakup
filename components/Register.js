import React, { Component } from 'react'
import config from '../api/config.js';

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

    this.onUserInput = this.onUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateInput = this.validateInput.bind(this);

    this.state = {
      registerSuccess: false,
      formData: {},
      errors: {
        'email': false,
        'password': false,
        'confirm_password': false,
      }
    }
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
    this.setState({ formData });
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

    if (formElement === "email") {
      let re = /\S+@(mail.)?mcgill.ca+/;
      let res = re.test(value);
      if (res) {
        errors[formElement] = false;
      } else {
        errors[formElement] = "A valid McGill email address is required!";
      }
      isValid = res;
    }

    if (formElement === "password") {
      if (value.length < 6) {
        errors[formElement] = "A password must be at least 6 characters!";
      } else {
        errors[formElement] = false;
      }
    }

    if (formElement === "confirm_password") {

      // Make sure passwords match
      if (value === this.state.formData['password']) {
        errors[formElement] = false;
      } else {
        errors[formElement] = "Password must match!";
        isValid = false;
      }

    }

    this.setState({ errors });
    return isValid;
  }

  handleSubmit() {

    let url = config.api + '/api/reg/';
    let formData = this.state.formData;
    let errors = this.state.errors;
    let hasErrors = false;


    // Make sure all fields are filled
    if (Object.keys(formData).length < 3) {
      hasErrors = true;
    }

    // Make sure all fields passed validation
    for (let key in formData) {
      if (formData.hasOwnProperty(key)) {
        let isValid = this.validateInput(key, formData[key]);
        if (!isValid) hasErrors = true;
      }
    }

    // If form has errors return
    if (hasErrors) {
      swal({
        "title": "Oops!",
        "text": "Please fill in all required fields to complete registration!",
        "type": "error"
      });
      return;
    }

    // Send AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
      if (xhr.readyState > 3 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response);
        if (response.success) {

          this.setState({
            registerSuccess: true
          });

          var router = this.props.router;

          swal({
            "title": "Registration succesful!!",
            "text": "You will be redirected to main page!",
            "timer": 2000,
            "type": "success"
          }, function () {
            var redirect = router.createLocation('/');
            router.push(redirect);
          });
        } else {
          var errors = this.state.errors;
          errors['name'] = response.message;
        }
      }
    }.bind(this);
    xhr.onerror = function (err) {
      console.error(err);
    }
    xhr.send(JSON.stringify(formData));

  }

  render() {

    let defaultClass = 'form-group-lg';
    let errors = this.state.errors;
    let fieldClasses = {};

    // Initilize field classes based on error state
    Object.keys(errors).map(function (key) {
      if (errors[key]) {
        fieldClasses[key] = defaultClass + ' has-error';
      } else {
        fieldClasses[key] = defaultClass;
      }
    });

    return (
      <div className="register-page">
        <div className="container">
          <div className="form-box">
            <h2>Registration</h2>
            <div className={fieldClasses['email']}>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                onBlur={this.onUserInput}
                />
              <span id="email-help" className="help-block">
                {errors['email']}
              </span>
            </div>
            <div className={fieldClasses['password']}>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                onBlur={this.onUserInput}
                />
              <span id="password-help" className="help-block">
                {errors['password']}
              </span>
            </div>
            <div className={fieldClasses['confirm_password']}>
              <input
                type="password"
                className="form-control"
                name="confirm_password"
                aria-describedby="password-help"
                placeholder="Confirm password"
                onBlur={this.onUserInput}
                />
              <span id="confirm_password-help" className="help-block">
                {errors['confirm_password']}
              </span>
            </div>
            <button
              type="button"
              className="btn btn-speakup"
              onClick={this.handleSubmit}>
              Register
                  </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
