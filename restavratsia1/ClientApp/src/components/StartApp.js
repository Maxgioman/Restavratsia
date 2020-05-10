import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import MainPage from "./MainPage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SignUpForm from "./SignUpForm";
import OrderDesk from "./OrderDesk";
import OrderInterface from "./OrderInterface";

class StartApp extends Component {
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
        <Route path={"/order-desk/cu-order_id/:id"}>
          <OrderInterface usertype="customer" />
        </Route>
        <Route path={"/order-desk/co-order_id/:id"}>
          <OrderInterface usertype="company" />
        </Route>
        <Route path={"/order-desk"} component={OrderDesk} />
        <Route exact path={"/"} component={MainPage} />
      </Switch>
    );
  }
}

export default StartApp;
