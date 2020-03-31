import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './css-styles/main-styles.css'
import './css-styles/dynamic-styles.css';

class Header extends Component {
    render() {
        return (
            <header className="d-flex-spacebtw">
                <div className="col-3">
                    <Link to="/"><img className="col-3 col-xl-3" src={require("./css-styles/images/logo_transparent.png")} id="logo"/></Link>
                </div>
                <nav className="menu flex-end-center col-9">
                    <div className="flex-row-center" >
                        <Link to="/sign-in" className="menu-link">sign in</Link>
                        <Link to="/sign-up" className="menu-link">sign up</Link>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;