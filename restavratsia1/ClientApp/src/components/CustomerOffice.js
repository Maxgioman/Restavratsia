import React, { Component } from "react";
import Header from "./header";
import CustomerOfficeMenu from "./CustomerOfficeMenu";

class CustomerOffice extends Component {
  log_out = () => {
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("isCompany");
  };

  render() {
    return (
      <div>
        <Header
          elements_link={["log out"]}
          links={{ "log out": "/" }}
          func_for_link={{ "log out": this.log_out }}
        />
        <div id="cust-office" className="position-fixed-with-header col-12">
          <CustomerOfficeMenu />
        </div>
      </div>
    );
  }
}

export default CustomerOffice;
