import React, {Component} from 'react';
import {faHeadset} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Footer extends Component {
    render() {
        return (
            <footer className="flex-column-center">
                <div id="footer-block1" className="flex-row-center col-12 flex-sm-column-center flex-md-column-center">
                    <div className="col-4 col-sm-11 height-100 flex-column-start_top">
                        <p className="text text-title pb-3 text-align-center">Have a question/proposition?</p>
                        <a className="text footer-link" href="mailto:some.email@gmail.com">some.email@gmail.com</a>
                        <a className="text footer-link" href="tel:+12345678910">+12345678910</a>
                    </div>
                    <div className="col-4 col-sm-11 height-100 flex-column-start_top">
                        <p className="text text-title pb-3">Technical Support</p>
                        <div className="flex-column-center">
                            <a href="#" className="footer-link"><FontAwesomeIcon icon={faHeadset} /></a>
                            <a href="#" className="footer-link">https://some.support.com</a>
                        </div>
                    </div>
                    <div className="col-4 col-sm-11 height-100 flex-column-start_top">
                        <p className="text text-title pb-3">Navigation</p>
                        <a href="#" className="footer-link">Home</a>
                        <a href="#sec2" className="footer-link">About</a>
                        <a href="#sec3" className="footer-link">Why we?</a>
                        <a href="#sec4" className="footer-link">About us</a>
                        <a href="#sec5" className="footer-link">Contacts</a>
                    </div>
                </div>
                <div id="footer-block2" className="flex-column-center col-12 pt-3">
                    <hr className="hr"/>
                    <p className="pt-4 pl-2 pr-2 text-align-center">Copyright ©2020 All rights reserved | This web-page was made by Restavratsia Team</p>
                </div>
            </footer>
        );
    }
}

export default Footer;