import React, { Component } from "react";
import "./css-styles/styles.css";
import "./css-styles/individual-styles.css";
import Signup from "./forms/Signup";

class SignUpForm extends Component {
  render() {
    return (
      <section
        id="reg-section"
        className="background-responsive section flex-column-center section-height-2x"
      >
        <div
          id="reg-user-div"
          className="container col-7 col-xxs-12 flex-column-center form"
        >
          <Signup usertype={this.props.usertype} />
        </div>
      </section>
    );
  }
}

export default SignUpForm;
