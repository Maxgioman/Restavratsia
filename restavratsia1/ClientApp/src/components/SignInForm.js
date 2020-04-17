import React, {Component} from 'react';
import './css-styles/styles.css';
import './css-styles/individual-styles.css';
import {Link} from "react-router-dom";

class SignInForm extends Component {
    render() {
        return (
            <div id="div-input" className="input-form col-sm-11">
                <div className="input-text flex-center">
                    <p className="text-form text col-sm-11 col-md-9">login</p>
                    <input type="text" className="input-field col-sm-11 col-md-9" placeholder="input here username or email"/>
                </div>
                <div className="input-text flex-center">
                    <p className="text-form text col-sm-11 col-md-9">password</p>
                    <input type="password" className="input-field col-sm-11 col-md-9" placeholder="input here password"/>
                </div>
                <div id="login-form-btn" className="flex-xxs-column-center flex-xs-column-center flex-md-column-center">
                    <Link to="/restore-password" id="btn-forgot" className="button-class login-form-btn mt-2">forgot your password?</Link>
                    <Link to="/" id="btn-login" className="button-class login-form-btn mt-2">sign in as {this.props.usertype}</Link>
                </div>
            </div>
        );
    }
}

export default SignInForm;