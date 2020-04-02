import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './css-styles/styles.css'
import './css-styles/individual-styles.css';

class Header extends Component {


    render() {

        return (
            <header className="d-flex-spacebtw">
                <div className="col-3">
                    <Link to="/"><img className="col-3 col-xl-3" src={require("./css-styles/images/logo_transparent.png")} id="logo"/></Link>
                </div>
                <nav className="menu flex-end-center col-9">
                    <div className="flex-row-center" >
                        <a href="#sec2" className="menu-link">INFO</a>
                        <a href="#sec3" className="menu-link">WHY WE?</a>
                        <a href="#sec4" className="menu-link">ABOUT US</a>
                        <a href="#sec5" className="menu-link">CONTACTS</a>
                        <Link to="/sign-in" className="menu-link sign-btn">|sign in|</Link>
                        <Link to="/sign-up" className="menu-link sign-btn">|sign up|</Link>
                    </div>
                </nav>
            </header>
        );
    }
}



export default Header;