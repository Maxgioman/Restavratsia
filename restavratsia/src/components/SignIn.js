import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './css-styles/main-styles.css';
import './css-styles/dynamic-styles.css';
import MainPage from "./MainPage";

class SignIn extends Component {
    render() {
        return (
            <Router>
                <section id="login-section" className="section">
                    <div id="login-container" className="container col-7 col-lg-10 col-sm-12 flex-center">
                        <div className="form">
                            <div id="login-choose" className="choosing">
                                <a id="login-customer-btn" className="button-class" href="#"><p>login as Customer</p></a>
                                <a id="login-company-btn" className="button-class" href="#"><p>login as Company</p></a>
                            </div>
                            <div id="div-input" className="input-form">
                                <div className="input-text flex-center">
                                    <p className="text-form text">login</p>
                                    <input type="text" className="input-field" placeholder="input here your login"/>
                                </div>
                                <div className="input-text flex-center">
                                    <p className="text-form text">password</p>
                                    <input type="password" className="input-field" placeholder="input here your password"/>
                                </div>
                            </div>
                            <div id="div-btn" className="btn-form">
                                <div id="btn-login-back" className="div-btn-block">
                                    <Link to="/" onClick={reloadPage} id="btn-back" className="button-class login-form-btn">back to main page</Link>
                                    <Link to="/" onClick={reloadPage} id="btn-login" className="button-class login-form-btn">sign in</Link>
                                </div>
                                <div id="btn-forgot-pass" className="div-btn-block">
                                    <Link to="/restore-password" id="btn-forgot" className="button-class login-form-btn">forgot your password?</Link>
                                </div>
                            </div>
                        </div>
                    </div>


                    <Switch>
                        <Route exact path="/">

                        </Route>
                        <Route path="/restore-password">

                        </Route>
                    </Switch>
                </section>
            </Router>
        );
    }
}

function reloadPage() {
    setTimeout(function () {
        window.location.reload()
    },5);
}

export default SignIn;
