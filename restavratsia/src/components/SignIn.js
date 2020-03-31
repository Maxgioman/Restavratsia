import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './css-styles/main-styles.css';
import './css-styles/dynamic-styles.css';
import SignInCustomer from "./SignInCustomer";
import SignInCompany from "./SignInCompany";
import Buttons from "./Buttons";

class SignIn extends Component {
    render() {
        return (
                <section id="login-section" className="section">
                    <div id="login-container" className="container col-7 col-lg-10 col-sm-12 flex-center">
                        <div className="form">
                            <div id="login-choose" className="choosing">
                                <Link to={'/sign-in/as-customer'} id="login-customer-btn" className="button-class">
                                    <p>login as Customer</p>
                                </Link>
                                <Link to={'/sign-in/as-company'} id="login-company-btn" className="button-class">
                                    <p>login as Company</p>
                                </Link>
                            </div>
                            <Switch>
                                <Route path={'/sign-in/as-customer'}>
                                    <SignInCustomer />
                                </Route>
                                <Route path={'/sign-in/as-company'}>
                                    <SignInCompany />
                                </Route>
                                <Route path={'/sign-in'}>
                                    <div id="div-choose" className="flex-center">
                                        <h1 id="zahlushka" className="text">choose category above</h1>
                                    </div>
                                </Route>
                            </Switch>
                            <Buttons/>
                        </div>
                    </div>
                </section>
        );
    }
}

export default SignIn;
