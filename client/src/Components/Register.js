import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      confirmPassword: "",
      redirectTo: null
    };

    //To keep the value of the input boxes to always be current with 'state'
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    );
  }

  handleFirstNameChange = event => {
    this.setState({ firstName: event.target.value });
  };
  handleLastNameChange = event => {
    this.setState({ lastName: event.target.value });
  };
  handleUserNameChange = event => {
    this.setState({ userName: event.target.value });
  };
  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };
  handleConfirmPasswordChange = event => {
    this.setState({ confirmPassword: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      alert("Password do not match");
    } else if (
      this.state.firstName ||
      this.state.lastName ||
      this.state.userName ||
      this.state.password !== ""
    ) {
      //Request to server goes here
      axios
        .post("/auth/signup", {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          userName: this.state.userName,
          password: this.state.password
        })
        .then(response => {
          if (!response.data.error) {
            alert(
              `Welcome ${response.data.firstName} ${
                response.data.lastName
              } ! Redirecting to Login`
            );
            this.setState({ redirectTo: "/login" });
          } else {
            alert("Username is taken");
            this.setState.firstName = "";
            this.setState.lastName = "";
            this.setState.userName = "";
            this.setState.password = "";
            this.setState.confirmPassword = "";
          }
        })
        .catch(err => {
          console.log("sign up error: ", err);
        });
    } else {
      alert("Pls fill all the required information");
    }
  };
  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    }
    return (
      <div className="container signupForm">
        <h4>Sign Up</h4>
        <form className="form">
          <div className="form-group">
            <div className="col-3 col-mr-auto">
              <input
                className="form-input"
                type="text"
                id="firstname"
                name="firstname"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={this.handleFirstNameChange}
              />
            </div>
            <div className="col-3 col-mr-auto">
              <input
                className="form-input"
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.handleLastNameChange}
              />
            </div>
            <div className="col-3 col-mr-auto">
              <input
                className="form-input"
                type="text"
                id="username"
                name="username"
                placeholder="User Name"
                value={this.state.userName}
                onChange={this.handleUserNameChange}
              />
            </div>
            <div className="col-3 col-mr-auto">
              <input
                className="form-input"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </div>
            <div className="col-3 col-mr-auto">
              <input
                className="form-input"
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                placeholder="Confirm Password"
                value={this.state.confirmpassword}
                onChange={this.handleConfirmPasswordChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-7">
              <button
                className="btn btn-default col-2 col-mr-auto"
                onClick={this.handleFormSubmit}
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
