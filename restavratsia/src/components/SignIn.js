import React, {Component} from 'react';
import {
    Switch,
    Route,
    Link
} from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './css-styles/styles.css';
import './css-styles/individual-styles.css';
import SignInForm from "./SignInForm";

class SignIn extends Component {
    render() {
        return (
                <section id="login-section" className="section">
                    <div id="login-container" className="container col-7 col-lg-10 col-sm-12 flex-center">
                        <div className="form">
                            <div id="login-choose" className="choosing">
                                <Link to={'/sign-in/as-customer'} id="login-customer-btn" className="button-class">
                                    <p>Customer</p>
                                </Link>
                                <Link to={'/sign-in/as-company'} id="login-company-btn" className="button-class">
                                    <p>Company</p>
                                </Link>
                            </div>
                            <Switch>
                                <Route path={'/sign-in/as-customer'}>
                                    <SignInForm usertype={'customer'} />
                                </Route>
                                <Route path={'/sign-in/as-company'}>
                                    <SignInForm usertype={'company'} />
                                </Route>
                                <Route path={'/sign-in'}>
                                    <div id="div-choose" className="flex-center">
                                        <h1 id="zahlushka" className="text">choose category above</h1>
                                    </div>
                                </Route>
                            </Switch>
                            <div id="div-btn" className="btn-form">
                                <div id="login-back-btn" className="div-btn-block">
                                    <Link to="/"  id="btn-back"  className="button-class login-form-btn">back to main page</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        );
    }
}

export default SignIn;
