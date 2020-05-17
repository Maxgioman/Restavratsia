import React, { Component } from "react";
import OrderInterface from "./OrderInterface";
import CustomerOffice from "./CustomerOffice";
import OrderDesk from "./OrderDesk";
import { Switch, Route } from "react-router-dom";

class RoutesAuthorized extends Component {
  render() {
    if (this.props.authorized) {
      return (
        <Switch>
          <Route path={"/order-desk/order/:id"}>
            <OrderInterface usertype="company" />
          </Route>
          <Route path={"/order/:id"}>
            <OrderInterface usertype="customer" />
          </Route>
          <Route path={"/customer-office/:id"} component={CustomerOffice} />
          <Route path={"/company-office/:id"} component={CustomerOffice} />
          <Route path={"/order-desk"} component={OrderDesk} />
        </Switch>
      );
    } else return null;
  }
}

export default RoutesAuthorized;
