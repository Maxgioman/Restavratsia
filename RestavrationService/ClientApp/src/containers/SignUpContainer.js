import React, { Component } from "react";
import Input from "../components/HTMLelements/Input";
import Select from "../components/HTMLelements/Select";
import { Link } from "react-router-dom";
import Button from "../components/HTMLelements/Button";

class SignUpContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: {
        username: "",
        companyName: "",
        password: "",
        firstName: "",
        surName: "",
        email: "",
        companySpec: "",
        address: "",
        phoneNumber: "+38",
      },

      cityOptions: [
        "Lviv region",
        "Kyiv region",
        "Chernivci region",
        "Ternopil region",
        "Uzhgorod region",
        "Vinnycia region",
        "Khmelnyckyi region",
        "Dnipro region",
        "Kharkiv region",
        "Cherkasy region",
        "Chernigiv region",
        "Sumy region",
        "Kherson region",
        "Krym region",
        "Zhytomyr region",
        "Lutsk region",
        "Poltava region",
        "Kirovograd region",
        "Mykolaiv region",
        "Zaporizhzhia region",
        "Ivano-Frankivsk region",
        "Rivne region",
        "Odesa region",
      ],
      specOptions: [
        "facade (buildings)",
        "interior work (buildings)",
        "furniture",
        "sculptures/monuments",
        "paintings",
        "metal products",
        "wood products",
        "vehicles",
        "electronic devices",
        "other",
      ],
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.company = this.company.bind(this);
    this.customer = this.customer.bind(this);
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      (prevState) => ({
        newUser: {
          ...prevState.newUser,
          [name]: value,
        },
      })
      //() => console.log(this.state.newUser)
    );
  }

  handleConfirmPassword(e) {}

  handleFormSubmit(e) {
    e.preventDefault();
    let userData;
    if (this.props.usertype === "customer") {
      userData = {
        usertype: "customer",
        username: this.state.newUser.username,
        password: this.state.newUser.password,
        name: this.state.newUser.firstName,
        surname: this.state.newUser.surName,
        email: this.state.newUser.email,
        phone: this.state.newUser.phoneNumber,
        address: this.state.newUser.address,
      };
    } else {
      userData = {
        usertype: "company",
        username: this.state.newUser.username,
        password: this.state.newUser.password,
        companyName: this.state.newUser.companyName,
        spec: this.state.newUser.companySpec,
        email: this.state.newUser.email,
        phone: this.state.newUser.phoneNumber,
        address: this.state.newUser.address,
      };
    }
    console.log(JSON.stringify(userData));
  }

  render() {
    let form;
    if (this.props.usertype === "customer") form = this.customer();
    else form = this.company();

    return (
      <form
        className="col-12 form-sign-up form"
        onSubmit={this.handleFormSubmit}
      >
        <div id="div-form-reg" className="flex-center col-12">
          <div id="div-from-reg-inner" className="flex-row-center col-12">
            <div id="reg-div-3-left" className="col-4 pr-1 pl-1">
              <fieldset className="fieldset text p-3 flex-column-center">
                <legend className="flex-row-center pl-1">Account info</legend>
                <div className="input-text flex-center mb-3">
                  <p className="text-form text col-12">Login</p>
                  <Input
                    className={"input-field col-12"}
                    name={"username"}
                    type={"text"}
                    value={this.state.newUser.username}
                    placeholder={"Enter your login"}
                    handleChange={this.handleInput}
                  />
                  <p className="text-form text col-12">Password</p>
                  <Input
                    className={"input-field col-12"}
                    name={"password"}
                    type={"password"}
                    value={this.state.newUser.password}
                    placeholder={"Enter your password"}
                    handleChange={this.handleInput}
                  />
                  <p className="text-form text col-12">Confirm password</p>
                  <Input
                    className={"input-field col-12"}
                    name={"passwordConfirmed"}
                    type={"password"}
                    placeholder={"Confirm your password"}
                    handleChange={this.handleInput}
                  />
                </div>
              </fieldset>
            </div>
            {form}
            <div
              id="reg-div-3-right"
              className="col-4 pr-1 pl-1 height-inherit"
            >
              <fieldset className="fieldset text p-3">
                <legend className="flex-row-center pl-1">Address</legend>
                <div className="input-text flex-center p-2 mb-3">
                  <p className="text-form text col-12">Phone number</p>
                  <Input
                    className={"input-field col-12 p-2"}
                    name={"phoneNumber"}
                    type={"text"}
                    value={this.state.newUser.phoneNumber}
                    placeholder={"Enter your phone number"}
                    handleChange={this.handleInput}
                  />
                  <p className="text-form text col-12">City region</p>
                  <Select
                    name={"address"}
                    options={this.state.cityOptions}
                    value={this.state.newUser.address}
                    placeholder={"Select your region"}
                    handleChange={this.handleInput}
                    className={"input-field col-12"}
                  />
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div id="div-btn-reg" className="flex-row-center col-12">
          <Link to={"/sign-up"} className="button-class login-form-btn p-2">
            back
          </Link>
          <Link to={"/sign-in"}>
            <Button
              action={this.handleFormSubmit}
              className={"button-class login-form-btn p-2 btn"}
              title={"Submit"}
            />
          </Link>
        </div>
      </form>
    );
  }

  customer() {
    return (
      <div id="reg-div-3-center" className="col-4 col-4 pr-1 pl-1">
        <fieldset className="fieldset text p-3">
          <legend className="flex-row-center pl-1">Your profile</legend>
          <div className="input-text flex-center mb-3">
            <p className="text-form text col-12">Name</p>
            <Input
              className={"input-field col-12"}
              name={"firstName"}
              type={"text"}
              value={this.state.newUser.firstName}
              placeholder={"Enter your name"}
              handleChange={this.handleInput}
            />
            <p className="text-form text col-12">Surname</p>
            <Input
              className={"input-field col-12"}
              name={"surName"}
              type={"text"}
              value={this.state.newUser.surName}
              placeholder={"Enter your surname"}
              handleChange={this.handleInput}
            />
            <p className="text-form text col-12">Email</p>
            <Input
              className={"input-field col-12"}
              name={"email"}
              type={"text"}
              value={this.state.newUser.email}
              placeholder={"Enter your email"}
              handleChange={this.handleInput}
            />
          </div>
        </fieldset>
      </div>
    );
  }

  company() {
    return (
      <div id="reg-div-3-center" className="col-4 col-4 pr-1 pl-1">
        <fieldset className="fieldset text p-3">
          <legend className="flex-row-center pl-1">Your profile</legend>
          <div className="input-text flex-center mb-3">
            <p className="text-form text col-12">Company name</p>
            <Input
              className={"input-field col-12"}
              name={"companyName"}
              type={"text"}
              value={this.state.newUser.companyName}
              placeholder={"Enter your company name"}
              handleChange={this.handleInput}
            />
            <p className="text-form text col-12">Specialisation</p>
            <Select
              name={"companySpec"}
              options={this.state.specOptions}
              value={this.state.newUser.companySpec}
              placeholder={"Select specialization"}
              handleChange={this.handleInput}
              className={"input-field col-12"}
            />
            <p className="text-form text col-12">Email</p>
            <Input
              className={"input-field col-12"}
              name={"email"}
              type={"text"}
              value={this.state.newUser.email}
              placeholder={"Enter your email"}
              handleChange={this.handleInput}
            />
          </div>
        </fieldset>
      </div>
    );
  }
}

export default SignUpContainer;
