import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css-styles/styles.css";
import "./css-styles/individual-styles.css";
import axios from "axios";
import SignUpContainer from "../containers/SignUpContainer";

class SignUpForm extends Component {
  render() {
    return (
      <section id="reg-user-sec" className="section flex-column-center">
        <div
          id="reg-user-div"
          className="container col-11 flex-column-center form"
        >
          <SignUpContainer usertype={this.props.usertype} />
        </div>
      </section>
    );
  }
}

export default SignUpForm;
