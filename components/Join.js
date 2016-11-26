import React, {Component} from 'react'
import '../styles/_join.scss';

/**
 * Register component.
 * Represents the registration page content.
 */
class Join extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.onUserInput = this.onUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      loginSuccess: false,
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

    var url = 'http://localhost:8080/api/auth/'
    var formData = this.state.formData;
    var errors = this.state.errors;

    // Send AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() {
      if (xhr.readyState > 3 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response);
        if (response.success) {

          var sessionData = {
            user: formData['name'],
            streamID: response.streamID,
            token: response.token,
          };

          this.props.onSessionUpdate(sessionData);


          if (this.props.sessionData) {
            var chatURL = '/chat/' + this.props.sessionData.streamID;
            var router = this.props.router;
            var redirect = router.createLocation(chatURL);
            router.push(redirect);
          }


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

    return (
      <div>
           <div className="container">
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <h2>Join Stream</h2>
                    <div className="form-group-lg">
                      <input type="email" className="form-control" name="name" placeholder="Email" onChange={this.onUserInput} />
                    </div>
                    <div className="form-group-lg">
                      <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.onUserInput} />
                    </div>
                    <div className="form-group-lg">
                      <input type="text" className="form-control" name="stream_id" placeholder="Stream ID" onChange={this.onUserInput} />
                    </div>
                    <button type="button" className="btn btn-speakup" onClick={this.handleSubmit}>Submit</button>
                </div>
            </div>

          </div>
      </div>
    );
  }
}

export default Join;
