import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import MainPage from "./MainPage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SignUpForm from "./SignUpForm";
import RoutesAuthorized from "./RoutesAuthorized";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: window.localStorage.getItem("userId"),
    };
  }
  render() {
    return (
      <Switch>
        <Route path={"/sign-up/as-customer"}>
          <SignUpForm usertype={"customer"} />
        </Route>
        <Route path={"/sign-up/as-company"}>
          <SignUpForm usertype={"company"} />
        </Route>
        <Route path={"/sign-in"} component={SignIn} />
        <Route path={"/sign-up"} component={SignUp} />
        <Route exact path={"/"} component={MainPage} />
        <RoutesAuthorized authorized={this.state.authorized} />
      </Switch>
    );
  }
}

export default Routes;
