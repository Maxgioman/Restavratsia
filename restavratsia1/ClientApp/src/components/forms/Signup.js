import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";

Yup.addMethod(Yup.mixed, "sameAs", function (ref, message) {
  return this.test("sameAs", message, function (value) {
    const other = this.resolve(ref);
    console.log("other : ", other);
    console.log("value : ", value);
    return !other || !value || value === other;
  });
});

export default function Signup(props) {
  let isCompany;
  let validationSchema;
  let form;
  if (props.usertype === "customer") {
    isCompany = 0;
    validationSchema = Yup.object().shape({
      username: Yup.string()
        .min(4, "too short")
        .max(25, "too long")
        .matches(
          "^[0-9a-zA-Z\\_]{4,}$",
          "username must contain only [A-Z|a-z|0-9] and '_' characters"
        )
        .required("this field is required"),
      password: Yup.string()
        .min(8, "too short")
        .max(16, "too long")
        .matches(
          "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,16}$",
          "password must contain only [A-Z|a-z|0-9] characters and it length should be 8-16 characters"
        )
        .required("this field is required"),
      passwordConfirmation: Yup.string()
        .when("password", {
          is: (val) => !!(val && val.length > 0),
          then: Yup.string().oneOf(
            [Yup.ref("password")],
            "password must match"
          ),
        })
        .required("this field is required"),
      name: Yup.string()
        .min(2, "must contain at least 2 character")
        .max(30, "too long")
        .matches(
          "^(?=[A-Z])[0-9a-zA-Z\\-]{4,}$",
          "this field must contain only letters(and '-'), first letter must be upper case"
        )
        .required("this field is required"),
      surname: Yup.string()
        .min(1, "must contain at least 1 character")
        .matches(
          "^(?=[A-Z])[0-9a-zA-Z\\-]{4,}$",
          "this field must contain only letters(and '-'), first letter must be upper case"
        )
        .max(30, "too long"),
      email: Yup.string()
        .email("invalid email format")
        .max(45, "too long")
        .required("this field is required"),
      phone: Yup.string()
        .matches(
          "\\+38[0-9]{10}",
          "invalid format, it should be +38 and 10 digits"
        )
        .max(13, "too long"),
    });
  } else {
    isCompany = 1;
    validationSchema = Yup.object().shape({
      username: Yup.string()
        .min(4, "too short")
        .max(25, "too long")
        .matches(
          "^[0-9a-zA-Z\\_]{4,}$",
          "username must contain only [A-Z|a-z|0-9] and '_' characters"
        )
        .required("this field is required"),
      companyName: Yup.string()
        .min(1, "too short")
        .max(45, "too long")
        .matches(
          '[0-9a-zA-Z\\-\\"\\ ]{1,}$',
          `company name must contain only [A-Z|a-z|0-9] and '-' or " characters`
        )
        .required("this field is required"),
      password: Yup.string()
        .min(8, "too short")
        .max(16, "too long")
        .matches(
          "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,16}$",
          "password must contain only [A-Z|a-z|0-9] characters and it length should be 8-16 characters"
        )
        .required("this field is required"),
      passwordConfirmation: Yup.string()
        .when("password", {
          is: (val) => !!(val && val.length > 0),
          then: Yup.string().oneOf(
            [Yup.ref("password")],
            "password must match"
          ),
        })
        .required("this field is required"),
      email: Yup.string()
        .email("invalid email format")
        .max(45, "too long")
        .required("this field is required"),
      phone: Yup.string()
        .matches(
          "\\+38[0-9]{10}",
          "invalid format, it should be +38 and 10 digits"
        )
        .max(13, "too long"),
    });
  }

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      username: "",
      companyName: "",
      password: "",
      passwordConfirmation: "",
      name: "",
      surname: "",
      email: "",
      phone: "",
      isCompany: isCompany,
    },
    validationSchema,
    onSubmit: (values) => {
      let newUser = {
        Login: values.username,
        Password: values.password,
        PasswordConfirm: values.passwordConfirmation,
        Email: values.email,
        Name: "",
        Surname: values.surname,
        isCompany: values.isCompany,
        Phone: values.phone,
      };
        if (props.usertype === "customer") newUser.Name = values.name;
        else newUser.Name = values.companyName;

      alert(JSON.stringify(newUser));
      axios
          .post("https://localhost:44348/api/account/register/", JSON.stringify(newUser), {
              headers: { "Content-Type": "application/json" },
          })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  /*
  const cityOptions = [
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
  ];
*/
  /*
  const specOptions = [
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
  ];
*/

  if (props.usertype === "customer") form = customer();
  else form = company();
  return (
    <form
      id="reg-form"
      className="col-12 form-sign-up form"
      onSubmit={handleSubmit}
    >
      <div id="div-form-reg" className="flex-center col-12">
        <div id="div-from-reg-inner" className="flex-column-center col-12">
          <h1
            id="reg-h1"
            className="text text-title text-align-center text-indent-0 mb-1"
          >
            <hr />
            --- New User Creation ---
            <hr />
          </h1>
          <h3 id="reg-h3" className="text text-align-center text-indent-0 mb-4">
            fields with * are required
          </h3>
          <div id="reg-div-3-top" className="col-10 col-xxs-12 flex-center">
            <div className="input-text col-11 flex-column-center">
              <p className="text-form text col-12 mb-1 mt-1">Login*</p>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your login"
                className="input-field col-12 mb-2 mt-1"
                onChange={handleChange}
                value={values.username}
              />
              {errors.username && touched.username ? (
                <p className="errorValidationText">{errors.username}</p>
              ) : null}
              <p className="text-form text col-12 mb-1 mt-1">Password*</p>
              <input
                id="password"
                name={"password"}
                type="password"
                placeholder={"Enter your password"}
                className={"input-field col-12 mb-2 mt-1"}
                onChange={handleChange}
                value={values.password}
              />
              {errors.password && touched.password ? (
                <p className="errorValidationText">{errors.password}</p>
              ) : null}
              <p className="text-form text col-12 mb-1 mt-1">
                Confirm password*
              </p>
              <input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                placeholder={"Confirm your password"}
                className={"input-field col-12 mb-2 mt-1"}
                onChange={handleChange}
                value={values.passwordConfirmation}
              />
              {errors.passwordConfirmation && touched.passwordConfirmation ? (
                <p className="errorValidationText">
                  {errors.passwordConfirmation}
                </p>
              ) : null}
            </div>
          </div>
          {form}
          <div id="reg-div-3-bottom" className="col-10 flex-center col-xxs-12">
            <div className="input-text col-11 flex-column-center">
              <p className="text-form text col-12 mb-1 mt-1">Email*</p>
              <input
                id="email"
                name={"email"}
                type="email"
                placeholder={"Enter company email"}
                className={"input-field col-12 mb-2 mt-1"}
                onChange={handleChange}
                value={values.email}
              />
              {errors.email && touched.email ? (
                <p className="errorValidationText">{errors.email}</p>
              ) : null}
              <p className="text-form text col-12 mb-1 mt-1">Phone number</p>
              <input
                id="phone"
                name={"phone"}
                type="tel"
                placeholder={"format: +381234567890"}
                className={"input-field col-12 mb-2 mt-1"}
                onChange={handleChange}
                value={values.phone}
              />
              {errors.phone && touched.phone ? (
                <p className="errorValidationText">{errors.phone}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div id="div-btn-reg" className="flex-row-center col-12">
        <Link to={"/sign-up"} className="button-class login-form-btn p-2">
          back
        </Link>
        <button
          id={"sign-up-btn"}
          name={"sign-up-btn"}
          type={"submit"}
          className={"button-class login-form-btn p-2 btn"}
        >
          sign up
        </button>
      </div>
    </form>
  );

  function customer() {
    return (
      <div id="reg-div-3-center" className="col-10 flex-center col-xxs-12">
        <div className="input-text col-11 flex-column-center ">
          <p className="text-form text col-12 mb-1 mt-1">Name*</p>
          <input
            id="name"
            name={"name"}
            type="text"
            placeholder={"Enter your name"}
            className={"input-field col-12 mb-2 mt-1"}
            onChange={handleChange}
            value={values.name}
          />
          {errors.name && touched.name ? (
            <p className="errorValidationText">{errors.name}</p>
          ) : null}
          <p className="text-form text col-12 mb-2 mt-1">Surname</p>
          <input
            id="surname"
            name={"surname"}
            type="text"
            placeholder={"Enter your surname"}
            className={"input-field col-12 mb-1 mt-1"}
            onChange={handleChange}
            value={values.surname}
          />
          {errors.surname && touched.surname ? (
            <p className="errorValidationText">{errors.surname}</p>
          ) : null}
        </div>
      </div>
    );
  }

  function company() {
    return (
      <div id="reg-div-3-center" className="col-10 flex-center col-xxs-12">
        <div className="input-text col-11 flex-column-center ">
          <p className="text-form text col-12 mb-1 mt-1">Company name*</p>
          <input
            id="companyName"
            name={"companyName"}
            type="text"
            placeholder={"Enter company name"}
            className={"input-field col-12 mb-2 mt-1"}
            onChange={handleChange}
            value={values.companyName}
          />
          {errors.companyName && touched.companyName ? (
            <p className="errorValidationText">{errors.companyName}</p>
          ) : null}
        </div>
      </div>
    );
  }
}
