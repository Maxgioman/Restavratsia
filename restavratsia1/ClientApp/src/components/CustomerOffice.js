import React, { Component } from "react";
import Header from "./header";
import CustomerOfficeMenu from "./CustomerOfficeMenu";

class CustomerOffice extends Component {
  render() {
    return (
      <div>
        <Header elements_link={["log out"]} links={{ "log out": "/" }} />
        <div id="cust-office" className="position-fixed-with-header col-12">
          <CustomerOfficeMenu />
        </div>
      </div>
    );
  }
}

export default CustomerOffice;
