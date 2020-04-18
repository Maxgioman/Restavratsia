import React, { Component } from "react";
import "./css-styles/styles.css";
import "./css-styles/individual-styles.css";
import { Link } from "react-router-dom";
import Header from "./header";

class SignUp extends Component {
  render() {
    return (
      <div>
        <Header elements_link={["back"]} links={{ back: "/" }} />
        <section
          id="reg-body"
          className="background-responsive section sm-section-height-2x flex-center"
        >
          <div
            id="out-block-sec1"
            className="container col-8 col-lg-11 col-md-12 flex-center background-transparent"
          >
            <div
              id="sign-up-choose"
              className="form flex-row-center col-md-12 flex-sm-column-center"
            >
              <Link
                to="/sign-up/as-customer"
                id="customer-pic"
                className="reg-choose button-class flex-center col-md-12"
              >
                <p className="text-center">
                  as <br /> Customer
                </p>
              </Link>
              <Link
                to="/sign-up/as-company"
                id="company-pic"
                className="reg-choose button-class flex-center col-md-12"
              >
                <p className="text-center">
                  as <br />
                  Company
                </p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default SignUp;
