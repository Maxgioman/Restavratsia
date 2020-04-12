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
  let validationSchema;
  let form;
  if (props.usertype === "customer") {
    validationSchema = Yup.object().shape({
      username: Yup.string()
        .min(4, "too short")
        .max(25, "too long")
        .required("this field is required"),
      password: Yup.string()
        .matches(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,16})",
          "password must contain only [A-Z|a-z|0-9] characters and it length should be 8-16 characters"
        )
        .required("this field is required"),
      passwordConfirmation: Yup.string().when("password", {
        is: (val) => !!(val && val.length > 0),
        then: Yup.string()
          .oneOf([Yup.ref("password")], "password must match")
          .required("this field is required"),
      }),
      name: Yup.string()
        .min(1, "must contain at least 1 character")
        .max(30, "too long")
        .required("this field is required"),
      surname: Yup.string()
        .min(1, "must contain at least 1 character")
        .max(30, "too long"),
      email: Yup.string()
        .email("invalid email format")
        .max(45, "too long")
        .required("this field is required"),
      phone: Yup.string().matches("\\+38[0-9]{10}", "invalid format"),
      address: Yup.string().required("this field is required"),
    });
  } else {
    validationSchema = Yup.object().shape({
      username: Yup.string()
        .min(4, "too short")
        .max(25, "too long")
        .required("this field is required"),
      companyName: Yup.string()
        .min(1, "too short")
        .max(45, "too long")
        .required("this field is required"),
      password: Yup.string()
        .matches(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,16})",
          "password must contain only [A-Z|a-z|0-9] characters and it length should be 8-16 characters"
        )
        .required("this field is required"),
      passwordConfirmation: Yup.string().when("password", {
        is: (val) => !!(val && val.length > 0),
        then: Yup.string()
          .oneOf([Yup.ref("password")], "password must match")
          .required("this field is required"),
      }),
      email: Yup.string()
        .email("invalid email format")
        .max(45, "too long")
        .required("this field is required"),
      companySpec: Yup.string().required("this field is required"),
      phone: Yup.string().matches("\\+38[0-9]{10}", "invalid format"),
      address: Yup.string().required("this field is required"),
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
      companySpec: "",
      phone: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (props.usertype === "customer") {
        alert(
          JSON.stringify({
            Login: values.username,
            Password: values.password,
            PasswordConfirm: values.passwordConfirmation,
            Email: values.email,
            Name: values.name,
            Surname: values.surname,
            Phone: values.phone,
          })
        );
        axios
          .post(
            "api/Account/Register/user",
            JSON.stringify({
              Login: values.username,
              Password: values.password,
              PasswordConfirm: values.passwordConfirmation,
              Email: values.email,
              Name: values.name,
              Surname: values.surname,
              Phone: values.phone,
            })
          )
          .then((resolve) => {
            console.log(resolve);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert(
          JSON.stringify({
            Login: values.username,
            Password: values.password,
            PasswordConfirm: values.passwordConfirmation,
            Email: values.email,
            CompanyName: values.name,
            CompanySpec: values.surname,
            Phone: values.phone,
          })
        );
        axios
          .post(
            "api/Account/Register/user",
            JSON.stringify({
              Login: values.username,
              Password: values.password,
              PasswordConfirm: values.passwordConfirmation,
              Email: values.email,
              CompanyName: values.name,
              CompanySpec: values.surname,
              Phone: values.phone,
            })
          )
          .then((resolve) => {
            console.log(resolve);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  });
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

  if (props.usertype === "customer") form = customer();
  else form = company();
  return (
    <form
      id="reg-form"
      className="col-12 form-sign-up form"
      onSubmit={handleSubmit}
    >
      <div id="div-form-reg" className="flex-center col-12">
        <div
          id="div-from-reg-inner"
          className="flex-row-center col-12 flex-xxs-column-center"
        >
          <div id="reg-div-3-left" className="col-4 pr-1 pl-1 col-xxs-12">
            <fieldset className="fieldset text p-3 flex-column-center">
              <legend className="flex-row-center pl-1">Account info</legend>
              <div className="input-text flex-center mb-3">
                <p className="text-form text col-12">Login*</p>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your login"
                  className="input-field col-12"
                  onChange={handleChange}
                  value={values.username}
                />
                {errors.username && touched.username ? (
                  <p className="errorValidationText">{errors.username}</p>
                ) : null}
                <p className="text-form text col-12">Password*</p>
                <input
                  id="password"
                  name={"password"}
                  type="password"
                  placeholder={"Enter your password"}
                  className={"input-field col-12"}
                  onChange={handleChange}
                  value={values.password}
                />
                {errors.password && touched.password ? (
                  <p className="errorValidationText">{errors.password}</p>
                ) : null}
                <p className="text-form text col-12">Confirm password*</p>
                <input
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  placeholder={"Confirm your password"}
                  className={"input-field col-12"}
                  onChange={handleChange}
                  value={values.passwordConfirmation}
                />
                {errors.passwordConfirmation && touched.passwordConfirmation ? (
                  <p className="errorValidationText">
                    {errors.passwordConfirmation}
                  </p>
                ) : null}
              </div>
            </fieldset>
          </div>
          {form}
          <div
            id="reg-div-3-right"
            className="col-4 pr-1 pl-1 height-inherit col-xxs-12"
          >
            <fieldset className="fieldset text p-3">
              <legend className="flex-row-center pl-1">Address</legend>
              <div className="input-text flex-center p-2 mb-3">
                <p className="text-form text col-12">City region*</p>
                <select
                  name="address"
                  id="address"
                  className={"input-field col-12"}
                  value={values.address}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select your region
                  </option>
                  {cityOptions.map((option) => {
                    return (
                      <option key={option} value={option} label={option}>
                        {option}
                      </option>
                    );
                  })}
                </select>
                {errors.address && touched.address ? (
                  <p className="errorValidationText">{errors.address}</p>
                ) : null}
                <p className="text-form text col-12">Phone number</p>
                <input
                  id="phone"
                  name={"phone"}
                  type="tel"
                  placeholder={"format: +381234567890"}
                  className={"input-field col-12"}
                  onChange={handleChange}
                  value={values.phone}
                />
                {errors.phone && touched.phone ? (
                  <p className="errorValidationText">{errors.phone}</p>
                ) : null}
              </div>
            </fieldset>
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
      <div id="reg-div-3-center" className="col-4 col-4 pr-1 pl-1 col-xxs-12">
        <fieldset className="fieldset text p-3">
          <legend className="flex-row-center pl-1">Your profile</legend>
          <div className="input-text flex-center mb-3">
            <p className="text-form text col-12">Name*</p>
            <input
              id="name"
              name={"name"}
              type="text"
              placeholder={"Enter your name"}
              className={"input-field col-12"}
              onChange={handleChange}
              value={values.name}
            />
            {errors.name && touched.name ? (
              <p className="errorValidationText">{errors.name}</p>
            ) : null}
            <p className="text-form text col-12">Surname</p>
            <input
              id="surname"
              name={"surname"}
              type="text"
              placeholder={"Enter your surname"}
              className={"input-field col-12"}
              onChange={handleChange}
              value={values.surname}
            />
            {errors.surname && touched.surname ? (
              <p className="errorValidationText">{errors.surname}</p>
            ) : null}
            <p className="text-form text col-12">Email*</p>
            <input
              id="email"
              name={"email"}
              type="email"
              placeholder={"Enter company email"}
              className={"input-field col-12"}
              onChange={handleChange}
              value={values.email}
            />
            {errors.email && touched.email ? (
              <p className="errorValidationText">{errors.email}</p>
            ) : null}
          </div>
        </fieldset>
      </div>
    );
  }

  function company() {
    return (
      <div id="reg-div-3-center" className="col-4 col-4 pr-1 pl-1 col-xxs-12">
        <fieldset className="fieldset text p-3">
          <legend className="flex-row-center pl-1">Your profile</legend>
          <div className="input-text flex-center mb-3">
            <p className="text-form text col-12">Company name*</p>
            <input
              id="companyName"
              name={"companyName"}
              type="text"
              placeholder={"Enter company name"}
              className={"input-field col-12"}
              onChange={handleChange}
              value={values.companyName}
            />
            {errors.companyName && touched.companyName ? (
              <p className="errorValidationText">{errors.companyName}</p>
            ) : null}
            <p className="text-form text col-12">Specialisation*</p>
            <select
              name="companySpec"
              id="companySpec"
              className={"input-field col-12"}
              value={values.companySpec}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select specialization
              </option>
              {specOptions.map((option) => {
                return (
                  <option key={option} value={option} label={option}>
                    {option}
                  </option>
                );
              })}
            </select>
            {errors.companySpec && touched.companySpec ? (
              <p className="errorValidationText">{errors.companySpec}</p>
            ) : null}
            <p className="text-form text col-12">Email*</p>
            <input
              id="email"
              name={"email"}
              type="email"
              placeholder={"Enter company email"}
              className={"input-field col-12"}
              onChange={handleChange}
              value={values.email}
            />
            {errors.email && touched.email ? (
              <p className="errorValidationText">{errors.email}</p>
            ) : null}
          </div>
        </fieldset>
      </div>
    );
  }
}
