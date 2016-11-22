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

    this.onUserInput = this.onUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      registerSuccess: false,
      formData: {},
      errors: {},
      hasError: false,
      errorMessage: ""
    }

  }


  /**
   * Set the form data based on input values
   *
   * @param {object} e - change event
   */
  onUserInput(e) {

    var value = e.target.value;
    var formElement = e.target.name;
    var formData = this.state.formData;

    formData[formElement] = value;
    this.setState({
      formData: formData
    });

  }

  handleSubmit() {

    var url = 'http://localhost:8080/api/reg/'
    var formData = this.state.formData;
    var errors = this.state.errors;

    if (formData['confirm_password']) {

      if (formData['confirm_password'] === formData['password']) {
        console.log("good pass");
      } else {
        console.log("the passwords must match");
        this.setState({
            hasError: true,
            errorMessage: "Passwords must match!"
        });
        return;
      }
    }

    // Send AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() {
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
            "text":  "You will be redirected to main page!",
            "timer": 2000,
            "type":  "success"
          }, function() {
            var redirect = router.createLocation('/');
            router.push(redirect);
          });
        } else {
          var errors = this.state.errors;
          errors['name'] = response.message;
        }
      }
    }.bind(this);
    xhr.onerror = function(err) {
      console.error(err);
    }
    xhr.send(JSON.stringify(formData));

  }

  render() {

    var hasError = this.state.hasError;
    var errorMessage = this.state.errorMessage;
    var defaultClass = "form-group";
    var errors = this.state.errors;

    var confirmPassClass = defaultClass;
    if (this.state.hasError) {
      confirmPassClass += " has-error";
    }

    return (
      <div className="container">
        <div className="row">
            <div className="col-md-4 col-md-offset-4">
                <h2>Registration</h2>
                <div className={defaultClass}>
                  <input type="text" className="form-control" name="name" placeholder="Email" onChange={this.onUserInput}/>
                </div>
                <div className={defaultClass}>
                  <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.onUserInput} />
                </div>
                <div className={confirmPassClass}>
                  <input
                    type="password"
                    className="form-control"
                    name="confirm_password"
                    aria-describedby="password-help"
                    placeholder="Confirm password"
                    onChange={this.onUserInput}
                  />
                  <span id="password-help" className="help-block">{errorMessage}</span>
                </div>
                <div className={defaultClass}>
                  <input type="text" className="form-control" name="stream_id" placeholder="Stream ID" onChange={this.onUserInput} />
                </div>
                <button type="button" className="btn btn-lg btn-block" onClick={this.handleSubmit}>Submit</button>
            </div>
        </div>
      </div>
    );
  }
}

export default Register;
