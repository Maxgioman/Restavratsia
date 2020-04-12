import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css-styles/styles.css";
import "./css-styles/individual-styles.css";
import Signup from "./forms/Signup";

class SignUpForm extends Component {
  render() {
    return (
      <section
        id="reg-user-sec"
        className="section flex-column-center xxs-section-height-2_5x"
      >
        <div
          id="reg-user-div"
          className="container col-11 flex-column-center form"
        >
          <Signup usertype={this.props.usertype} />
        </div>
      </section>
    );
  }
}

export default SignUpForm;
