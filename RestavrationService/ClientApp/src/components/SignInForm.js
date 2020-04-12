import React, { Component } from "react";
import "./css-styles/styles.css";
import "./css-styles/individual-styles.css";
import Signin from "./forms/Signin";

class SignInForm extends Component {
  render() {
    return <Signin usertype={this.props.usertype} />;
  }
}

export default SignInForm;
