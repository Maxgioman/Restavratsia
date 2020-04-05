import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './css-styles/styles.css';
import './css-styles/individual-styles.css';

class SignUpForm extends Component {
    render() {
        let form;
        if(this.props.usertype === 'customer')
            form = customer();
        else
            form = company();

        return (
            <section id="reg-user-sec" className="section flex-column-center">
                <div id="reg-user-div" className="container col-11 flex-column-center form">
                    <div id='div-form-reg' className="flex-center col-12" >
                        <div id="div-from-reg-inner" className="flex-row-center col-12">
                            <div id="reg-div-3-left" className="col-4 pr-1 pl-1">
                                <fieldset className="fieldset text p-3 flex-column-center">
                                    <legend className="flex-row-center pl-1"><div className="number flex-center text-bold text-align-center pr-3">1</div> Account info</legend>
                                    <div className="input-text flex-center">
                                        <p className="text-form text col-11">Login</p>
                                        <input type="text" className="input-field col-11" placeholder="Enter your login" />
                                        <p className="text-form text col-11">Password</p>
                                        <input type="password" className="input-field col-11" placeholder="Enter your password" />
                                        <p className="text-form text col-11">Confirm password</p>
                                        <input type="password" className="input-field col-11" placeholder="Confirm your password" />
                                    </div>
                                </fieldset>
                            </div>
                            {form}
                            <div id="reg-div-3-right" className="col-4 pr-1 pl-1 height-inherit">
                                <fieldset className="fieldset text p-3">
                                    <legend className="flex-row-center pl-1"><div className="number flex-center text-bold text-align-center pr-3">3</div> Address</legend>
                                    <div className="input-text flex-center p-2">
                                        <p className="text-form text col-11 p-2">Phone number</p>
                                        <input type="text" className="input-field col-11 p-2" placeholder="Enter your phone number" />
                                        <p className="text-form text col-11">City</p>
                                        <select type="text" className="input-field col-11" name="user-city">
                                            <optgroup label="Ukraine">
                                                <option value="kyiv">Kyiv</option>
                                                <option value="lviv">Lviv</option>
                                                <option value="kharkiv">Kharkiv</option>
                                                <option value="dnipro">Dnipro</option>
                                                <option value="kherson">Kherson</option>
                                                <option value="chaernihiv">Chernihiv</option>
                                            </optgroup>
                                            <optgroup label="Poland">
                                                <option value="warsaw">Warsaw</option>
                                                <option value="lunlin">Lublin</option>
                                                <option value="rzeszow">Rzeszow</option>
                                            </optgroup>
                                            <optgroup label="Belarus">
                                                <option value="minsk">Minsk</option>
                                                <option value="brest">Brest</option>
                                            </optgroup>
                                        </select>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    <div id='div-btn-reg' className="flex-row-center col-12">
                        <Link to={'/sign-up'} className="button-class login-form-btn p-2">back</Link>
                        <Link to={'/sign-in'} className="button-class login-form-btn p-2">sign up</Link>
                    </div>
                </div>
            </section>
        );
    }
}

function customer() {
    return(
        <div id="reg-div-3-center" className="col-4 col-4 pr-1 pl-1">
            <fieldset className="fieldset text p-3">
                <legend className="flex-row-center pl-1"><div className="number flex-center text-bold text-align-center pr-3">2</div> Your profile</legend>
                <div className="input-text flex-center">
                    <p className="text-form text col-11">Name</p>
                    <input type="text" className="input-field col-11" placeholder="Enter your name" />
                    <p className="text-form text col-11">Surname</p>
                    <input type="text" className="input-field col-11" placeholder="Enter your surname" />
                    <p className="text-form text col-11">Email</p>
                    <input type="text" className="input-field col-11" placeholder="Enter your email" />
                </div>
            </fieldset>
        </div>
    );
}

function company() {
    return(
        <div id="reg-div-3-center" className="col-4 col-4 pr-1 pl-1">
            <fieldset className="fieldset text p-3">
                <legend className="flex-row-center pl-1"><div className="number flex-center text-bold text-align-center pr-3">2</div> Your profile</legend>
                <div className="input-text flex-center">
                    <p className="text-form text col-11">Company name</p>
                    <input type="text" className="input-field col-11" placeholder="Enter your name" />
                    <p className="text-form text col-11">Specialisation</p>
                    <select type="text" className="input-field col-11" name="company-specialisation">
                        <optgroup label="group 1">
                            <option value="spec1">spec1</option>
                            <option value="spec2">spec2</option>
                            <option value="spec3">spec3</option>
                            <option value="spec4">spec4</option>
                        </optgroup>
                        <optgroup label="group 2">
                            <option value="spec1">spec1</option>
                            <option value="spec2">spec2</option>
                            <option value="spec3">spec3</option>
                            <option value="spec4">spec4</option>
                        </optgroup>
                    </select>
                    <p className="text-form text col-11">Email</p>
                    <input type="text" className="input-field col-11" placeholder="Enter your email" />
                </div>
            </fieldset>
        </div>
    );
}

export default SignUpForm;