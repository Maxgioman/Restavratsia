import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Buttons extends Component {
    render() {
        return (
            <div id="div-btn" className="btn-form">
                <div id="login-back-btn" className="div-btn-block">
                    <Link to="/"  id="btn-back"  className="button-class login-form-btn">back to main page</Link>
                </div>
            </div>
        );
    }
}

export default Buttons;