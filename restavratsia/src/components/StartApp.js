import React, {Component} from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import Header from "./header";
import MainPage from "./MainPage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SignUpCustomer from "./SignUpCustomer";
import SignUpCompany from "./SignUpCompany";

class StartApp extends Component {
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route path={'/sign-up/as-customer'} component={SignUpCustomer} />
                    <Route path={'/sign-up/as-company'} component={SignUpCompany} />
                    <Route path={'/sign-in'} component={SignIn} />
                    <Route path={'/sign-up'} component={SignUp} />
                    <Route exact path={'/'} component={MainPage} />
                </Switch>
            </div>
        );
    }
}

export default StartApp;