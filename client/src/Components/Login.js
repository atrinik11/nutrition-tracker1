import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      loggedIn: false,
      user: null,
      RedirectTo: null
    };
    //To Keep the values of the input boxes to always be current with 'state'
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUserNameChange = event => {
    this.setState({ userName: event.target.value });
  };
  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.userName && this.state.password !== "") {
      axios
        .post("/auth/login", {
          userName: this.state.userName,
          password: this.state.password
        })
        .then(response => {
          alert(
            `Welcome ${response.data.user.userName}! Redirecting to profile`
          );
          this.setState({ loggedIn: true, user: response.data.user });
          this.setState({ redirectTo: "/Profile" });
        })
        .catch(err => {
          alert("User not found or password incorrect");
          this.setState.userName = "";
          this.setState.password = "";
        });
    } else {
      alert("Pls provide with Username and Password");
    }
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div className="container loginForm">
          <h4>Sign In</h4>
          <form className="form">
            <div className="form-group">
              <div className="col-3 col-mr-auto">
                <input
                  className="form-input"
                  type="text"
                  id="userName"
                  name="userName"
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
            </div>
            <div className="form-group">
              <div className="col-7" />
              <button
                className="btn btn-default col-2 col-mr-auto"
                onClick={this.handleFormSubmit}
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      );
    }
  }
}

export default Login;
