import React, { Component } from "react";
// import API from "../src/Utils";
import Header from "../src/Components/Header";
// import Navbar from "../src/Components/Navbar";
// import Home from "../src/Components/Home";
import Login from "../src/Components/Login";

import Register from "./Components/Register";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

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
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    }
    return (
      <div className="App">
        <div className="container">
          <Header user="this.state.user" />
          {/* <Navbar loggedIn={this.state.loggedIn} logout={this.logout} /> */}
          <Switch>
            {/* <Route
              exact
              path="/"
              render={() => <Home user={this.state.user} />}
            /> */}
            <Route
              exact
              path="/Login"
              render={() => <Login loggedIn={this.state.loggedIn} />}
            />
            <Route exact path="/Register" component={Register} />
          </Switch>
          <Register />
        </div>
      </div>
    );
  }
}

export default App;
