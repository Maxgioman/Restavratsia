import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";

export default function Signin(props) {
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      UserType: props.usertype,
      Login: "",
      Password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      if (props.usertype === "customer") {
        axios
          .post("api/for/login/customer/", JSON.stringify(values))
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .post("api/for/login/company/", JSON.stringify(values))
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  });

  return (
    <form
      id="div-input"
      className="input-form col-sm-11"
      onSubmit={handleSubmit}
    >
      <div className="input-text flex-center">
        <p className="text-form text col-sm-11 col-md-9">login</p>
        <input
          id="Login"
          name="Login"
          type="text"
          className="input-field col-sm-11 col-md-9"
          placeholder="input here username or email"
          value={values.Login}
          onChange={handleChange}
        />
      </div>
      <div className="input-text flex-center">
        <p className="text-form text col-sm-11 col-md-9">password</p>
        <input
          id="Password"
          name="Password"
          type="password"
          className="input-field col-sm-11 col-md-9"
          placeholder="input here password"
          value={values.Password}
          onChange={handleChange}
        />
      </div>
      <div
        id="login-form-btn"
        className="flex-xxs-column-center flex-xs-column-center flex-md-column-center"
      >
        <Link
          to="/restore-password"
          id="btn-forgot"
          className="button-class login-form-btn mt-2"
        >
          forgot your password?
        </Link>
        <button
          id="btn-login"
          type="submit"
          className="button-class login-form-btn mt-2 btn"
        >
          sign in as {props.usertype}
        </button>
      </div>
    </form>
  );
}
