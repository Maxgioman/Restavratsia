import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './css-styles/styles.css'
import './css-styles/individual-styles.css';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {loggedIn: false};
    };

    render() {
        let btns;
        if(this.state.loggedIn)
            btns = logged_in(this.props.username);
        else
            btns = sign_btns();

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
                        {btns}
                    </div>
                </nav>
            </header>
        );
    }
}

function sign_btns() {
    return(
        <div className='flex-row-center'>
            <Link to="/sign-in" className="menu-link sign-btn">|sign in|</Link>
            <Link to="/sign-up" className="menu-link sign-btn">|sign up|</Link>
        </div>
    );
}

function logged_in(username) {
    return(
      <div>
          <a className="menu-link" href='#'>{username}</a>
      </div>
    );
}

export default Header;