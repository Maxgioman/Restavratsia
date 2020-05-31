import React, { Component } from "react";
import Header from "./header";
import UserOfficeMenu from "./UserOfficeMenu";

class UserOffice extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  log_out = () => {
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("isCompany");
  };

  render() {
    let part = <UserOfficeMenu usertype={this.props.usertype} />;

    return (
      <div>
        <Header
          elements_link={["log out"]}
          links={{ "log out": "/" }}
          func_for_link={{ "log out": this.log_out }}
        />
        <div id="cust-office" className="position-fixed-with-header col-12">
          {part}
        </div>
      </div>
    );
  }
}

export default UserOffice;
