import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useFormik } from "formik";
import request from "../Utils/RequestWrapper";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default function Signin(props) {
  const { handleSubmit, setFieldValue, handleChange, values } = useFormik({
    initialValues: {
      Login: "",
      Password: "",
      dialog: false,
      msg: "",
      redirect: false,
      redirectTo: "",
    },
    onSubmit: () => {
      request({
        method: "post",
        url: "account/login/",
        data: { Login: values.Login, Password: values.Password },
      })
        .then((resp) => {
          if (resp.status === 200) {
            const data = resp.data.value[0].split(" ");
            window.localStorage.setItem("userId", data[0]);
            window.localStorage.setItem("username", data[1]);
            window.localStorage.setItem("isCompany", data[2]);
            if (data[2] === "1") {
              setFieldValue("redirectTo", "/company-office/" + data[0]);
              handleRedirect();
            } else {
              setFieldValue("redirectTo", "/customer-office/" + data[0]);
              handleRedirect();
            }
          }
        })
        .catch((err) => {
          setFieldValue("msg", err.data.message);
          handleDialogOpen();
        });
    },
  });

  const handleRedirect = () => {
    setFieldValue("redirect", true);
  };

  const handleDialogOpen = () => {
    setFieldValue("dialog", true);
  };
  const handleDialogClose = () => {
    setFieldValue("dialog", false);
  };

  if (values.redirect) {
    return <Redirect to={values.redirectTo} />;
  }

  return (
    <form
      id="div-input"
      className="input-form col-sm-11 mt-4"
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
          sign in
        </button>
      </div>
      <Dialog
        open={values.dialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={handleDialogClose}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FontAwesomeIcon className="mr-1" icon={faTimesCircle} />{" "}
            {values.msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDialogClose}
          >
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
