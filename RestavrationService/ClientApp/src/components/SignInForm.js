import React, {Component} from 'react';
import './css-styles/styles.css';
import './css-styles/individual-styles.css';
import {Link} from "react-router-dom";
import axios from "axios";

class SignInForm extends Component {
    constructor(props){
        super(props);
        this.state ={
            users: []
        }
    }
    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response =>{
            console.log(response);
            this.setState({users: response.data})
        }).catch(error=>{
            console.log(error);
        })
    }

    render() {
        const user = this.state;
        console.log(user);
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
                    <Link to="/" id="btn-login" /*onClick={function () {
                        let attr = [];
                        let a = document.getElementsByClassName('input-field');
                        for (let i = 0; i < a.length; i++) {
                            attr.push(a[i].value)
                        }

                        if(attr[0] === user.users[0].username && attr[1] === user.users[0].email)
                            alert('welcome');
                        else
                            alert('error')
                    }}*/ className="button-class login-form-btn mt-2">sign in as {this.props.usertype}</Link>
                </div>
            </div>
        );
    }
}



export default SignInForm;