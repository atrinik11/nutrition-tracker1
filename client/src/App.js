import React, { Component } from "react";
// import API from "../src/Utils";
import Login from "../src/Components/Login";
import "./App.css";
// import { Route, Redirect } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: null,
      loggedIn: false,
      user: null
    };
    // this.logout = this.logout.bind(this);
  }
  render() {
    // if (this.state.redirectTo) {
    //   return <Redirect to={{ pathname: this.state.redirectTo }} />;
    // }
    return (
      <div className="App">
        <div className="container">
          <Login />
        </div>
      </div>
    );
  }
}

export default App;
