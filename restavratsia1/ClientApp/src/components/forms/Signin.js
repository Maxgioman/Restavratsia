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
            window.localStorage.setItem("userId", resp.data.value.id);
            window.localStorage.setItem("username", resp.data.value.username);
            window.localStorage.setItem("isCompany", resp.data.value.isCompany);
            if (resp.data.value.isCompany === 1) {
              setFieldValue(
                "redirectTo",
                "/company-office/" + resp.data.value.id
              );
              setTimeout(() => {
                handleRedirect();
              }, 700);
            } else if (resp.data.value.isCompany === 0) {
              setFieldValue(
                "redirectTo",
                "/customer-office/" + resp.data.value.id
              );
              setTimeout(() => {
                handleRedirect();
              }, 700);
            }
          }
        })
        .catch((err) => {
          if (err.data.errors) {
            if (err.data.errors.Login && err.data.errors.Password)
              setFieldValue(
                "msg",
                err.data.errors.Login[0] + ". " + err.data.errors.Password[0]
              );
            else if (err.data.errors.Login)
              setFieldValue("msg", err.data.errors.Login[0]);
            else setFieldValue("msg", err.data.errors.Password[0]);
          } else if (err.data.message) {
            setFieldValue("msg", err.data.message);
          }
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
