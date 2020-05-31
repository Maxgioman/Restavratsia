import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css-styles/styles.css";
import "./css-styles/individual-styles.css";
import {
  faHeadset,
  faPhoneAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "./footer";
import Header from "./header";
import BackToTop from "react-back-to-top";

class MainPage extends Component {
  render() {
    let elem;
    let link;
    if (window.localStorage.getItem("username")) {
      elem = [window.localStorage.getItem("username")];
      if (window.localStorage.getItem("isCompany") === "1")
        link = {
          [elem[0]]: "/company-office/" + window.localStorage.getItem("userId"),
        };
      else
        link = {
          [elem[0]]:
            "/customer-office/" + window.localStorage.getItem("userId"),
        };
    } else {
      elem = ["|sign in|", "|sign up|"];
      link = { "|sign in|": "/sign-in", "|sign up|": "/sign-up" };
    }
    return (
      <div>
        <Header
          elements_href={["INFO", "WHY WE?", "ABOUT US", "CONTACTS"]}
          elements_link={elem}
          hrefs={{
            INFO: "#sec2",
            "WHY WE?": "#sec3",
            "ABOUT US": "#sec4",
            CONTACTS: "#sec5",
          }}
          links={link}
        />
        <section id="block1-sec1" className="section background-responsive">
          <div className="container col-12 flex-row-center flex-lg-column">
            <div className="col-6 flex-center">
              <div id="login-btn" className="col-7 flex-center">
                <Link to={"/sign-in"} className="auth-btn">
                  LOGIN
                </Link>
              </div>
            </div>
            <div className="col-6 flex-center">
              <div id="register-btn" className="col-7 flex-center">
                <Link to={"/sign-up"} className="auth-btn">
                  REGISTER
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="sec2" className="section lg-section-height-2x">
          <div className="container col-10 flex-row-center flex-lg-column">
                    <div className="col-12 col-lg-9 col-md-12 col-sm-12">
                        <div id="text-block" className="flex-center">
                <p id="text1-1" className="text text-title">
                  {" "}
                  Something about{" "}
                </p>
                <br />
                <p id="text1-2" className="text">
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                  aspernatur at delectus eaque excepturi hic, iste nemo nobis
                  officia optio, provident quae, quaerat reiciendis suscipit
                  voluptatibus? Commodi cupiditate ipsa voluptatibus.
                </p>
                <br />
                <p id="text1-3" className="text">
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                  aspernatur at delectus eaque excepturi hic, iste nemo nobis
                  officia optio, provident quae, quaerat reiciendis suscipit
                  voluptatibus? Commodi cupiditate ipsa voluptatibus.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="sec3"
          className="section background-responsive lg-section-height-1_5x sm-section-height-2x"
        >
          <div
            id="block1-sec3"
            className="container col-9 col-md-11 col-sm-12 flex-center background-transparent"
          >
            <div
              id="text-sec3"
              className="text-block col-10 flex-column-start text-box-black p-5"
            >
              <p id="text2-1" className="text text-title text-sec3-font-size">
                {" "}
                Opportunities{" "}
              </p>
              <br />
              <p id="text2-2" className="text text-bold text-sec3-font-size">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Delectus, neque?
              </p>
              <br />
              <p id="text2-3" className="text text-bold text-sec3-font-size">
                Lorem ipsum dolor sit amet, consectetur.
              </p>
              <br />
              <p id="text2-4" className="text text-bold text-sec3-font-size">
                Lorem ipsum dolor sit amet.
              </p>
              <br />
              <p id="text2-5" className="text text-bold text-sec3-font-size">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Asperiores deleniti eveniet expedita minus nesciunt quo!
              </p>
              <br />
              <p id="text2-6" className="text text-bold text-sec3-font-size">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. At!
              </p>
            </div>
          </div>
        </section>
        <section id="sec4" className="section  lg-section-height-2x ">
          <div className="container flex-row-center col-10 col-md-11 col-sm-12 flex-lg-column">
            <div className="col-12 flex-center height-inherit col-sm-12 col-lg-11">
              <div
                id="sec4-text"
                className="col-11 text-block text-box-black flex-column-start"
              >
                <p className="text pb-4">
                  Lorem ipsum dolor sit amet, consectetur.
                </p>
                <p className="text pb-4">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Fuga.
                </p>
                <p className="text pb-4">
                  Lorem ipsum dolor sit amet, consectetur adipisicing.
                </p>
                <p className="text pb-4">Lorem ipsum dolor sit amet.</p>
                <p className="text pb-4">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="sec5"
          className="section sm-section-height-1_25x background-responsive"
        >
          <div className="container col-9 col-sm-12 flex-end-center">
            <div className="col-6 col-md-9 col-sm-12 flex-center height-100">
              <div
                id="sec5-textblock"
                className="text-block flex-column-start col-11"
              >
                <p className="text text-title pb-4">How to find us</p>
                <p className="text pl-3 pb-2">technical support:</p>
                <p className="text p-1">
                  <FontAwesomeIcon icon={faHeadset} /> https://some.support.com
                </p>
                <p className="text pl-3 pb-2">phone:</p>
                <p className="text p-1">
                  <FontAwesomeIcon icon={faPhoneAlt} /> +12345678910
                </p>
                <p className="text pl-3 pb-2">email:</p>
                <p className="text p-1">
                  <FontAwesomeIcon icon={faEnvelope} /> some.email@gmail.com
                </p>
                <p className="text pl-3 pb-2">instagram:</p>
                <p className="text p-1">
                  <FontAwesomeIcon icon={faInstagram} /> some instagram
                </p>
                <p className="text pl-3 pb-2">facebook:</p>
                <p className="text p-1">
                  <FontAwesomeIcon icon={faFacebook} /> some facebook
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default MainPage;
