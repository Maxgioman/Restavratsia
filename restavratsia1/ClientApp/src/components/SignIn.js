import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css-styles/styles.css";
import "./css-styles/individual-styles.css";
import Signin from "./forms/Signin";
import Header from "./header";

class SignIn extends Component {
  render() {
    return (
      <div>
        <Header />
        <section
          id="login-section"
          className="background-responsive section xxs-section-height-1_25x md-section-height-1_125x"
        >
          <div
            id="login-container"
            className="container col-7 col-lg-10 col-sm-12 flex-center"
          >
            <div className="form">
              <Signin />
              <div id="div-btn" className="btn-form">
                <div id="login-back-btn" className="div-btn-block">
                  <Link
                    to="/"
                    id="btn-back"
                    className="button-class login-form-btn"
                  >
                    back to main page
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default SignIn;
