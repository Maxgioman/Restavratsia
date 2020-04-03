import React, {Component} from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import Header from "./header";
import MainPage from "./MainPage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SignUpForm from "./SignUpForm";
import Footer from "./footer";

class StartApp extends Component {
    render() {
        return (
            <div>
                <Header username={'_user_'} />
                <Switch>
                    <Route path={'/sign-up/as-customer'}>
                        <SignUpForm usertype={'customer'} />
                    </Route>
                    <Route path={'/sign-up/as-company'}>
                        <SignUpForm usertype={'company'} />
                    </Route>
                    <Route path={'/sign-in'} component={SignIn} />
                    <Route path={'/sign-up'} component={SignUp} />
                    <Route exact path={'/'} component={MainPage} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default StartApp;