import React, { useEffect } from "react";
import { useFormik } from "formik";
import red from '@material-ui/core/colors/red';
import {
  Button,
  TextField,
  Avatar,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import ChangePassword from "./forms/ChangePassword";
import request from "./Utils/RequestWrapper";
import { Redirect } from "react-router-dom";
import Collapse from "@material-ui/core/Collapse/Collapse";
import Alert from "@material-ui/lab/Alert/Alert";
import CloseIcon from "@material-ui/icons/Close"; 




const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(40),
    height: theme.spacing(40),
  },
}));

let validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "too short")
    .max(25, "too long")
    .matches(
      "^[0-9a-zA-Z\\_]{4,}$",
      "username must contain only [A-Z|a-z|0-9] and '_' characters"
    )
    .required("this field is required"),
  email: Yup.string()
    .email("invalid email format")
    .max(45, "too long")
    .required("this field is required"),
  phone: Yup.string()
    .matches("\\+38[0-9]{10}", "invalid format, it should be +38 and 10 digits")
    .max(13, "too long"),
});
let customerValid = Yup.object().shape({
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
});
let companyValid = Yup.object().shape({
  companyName: Yup.string()
    .min(1, "too short")
    .max(45, "too long")
    .matches(
      '[0-9a-zA-Z\\-\\"\\ ]{1,}$',
      `company name must contain only [A-Z|a-z|0-9] and '-' or " characters`
    )
    .required("this field is required"),
});

export default function ProfilePage(props) {
  const style = useStyles();

  props.usertype === "customer"
    ? (validationSchema = validationSchema.concat(customerValid))
    : (validationSchema = validationSchema.concat(companyValid));

  const { handleSubmit, setFieldValue, values, errors, touched } = useFormik({
    initialValues: {
      username: "",
      companyName: "",
      name: "",
      surname: "",
      email: "",
      phone: "",
      disableControl: true,
      btnClass: "d-none",
      deleteAccount: false,
      changePassForm: false,
      alertSuccess: false,
      alertError: false,
      errorMsg: "",
      alertShow: false,
      redirect: false,
    },
    validationSchema,
    onSubmit: (values) => {
      let data = {
        Login: values.username,
        Email: values.email,
        Phone: values.phone,
      };
      if (window.localStorage.getItem("isCompany") === "1") {
        data = {
          ...data,
          Name: values.companyName,
        };
      } else {
        data = {
          ...data,
          Name: values.name,
          Surname: values.surname,
        };
      }
      request({
        method: "post",
        url: "account/edit/" + window.localStorage.getItem("userId"),
        data: data,
      })
        .then((response) => {
          handleAlert("alertSuccess", true);
          setTimeout(() => {
            handleAlertShow(true);
          }, 700);
          handleDisable();
          setTimeout(() => {
            handleAlertShow(false);
          }, 5000);
        })
        .catch((error) => {
          if (error.data) setFieldValue("errorMsg", error.data[0].description);
          else setFieldValue("errorMsg", "Something went wrong");
          handleAlert("alertError", true);
          setTimeout(() => {
            handleAlertShow(false);
          }, 5000);
        });
    },
  });

  function data() {
    request({
      method: "get",
      url: "/account/profile/" + window.localStorage.getItem("userId"),
    })
      .then((resp) => {
        const data = resp.data.value;
        setFieldValue("username", window.localStorage.getItem("username"));
        setFieldValue("email", data.email);
        setFieldValue("phone", data.phone);
        if (window.localStorage.getItem("isCompany") === "1") {
          setFieldValue("companyName", data.name);
        } else {
          setFieldValue("name", data.name.split(" ")[0]);
          setFieldValue("surname", data.name.split(" ")[1]);
        }
        //console.log(resp);
      })
      .catch((err) => {
        //console.log(err);
      });
  }

  useEffect(data, []);

  const handleAlert = (type, value) => {
    setFieldValue(type, value);
  };
  const handleAlertShow = (value) => {
    setFieldValue("alertShow", value);
  };
  const handleCancel = () => {
    data();
    handleDisable();
  };
  const handleEnable = () => {
    setFieldValue("disableControl", false);
    setFieldValue("btnClass", "m-1 ml-4 mr-4");
  };
  const handleDisable = () => {
    setFieldValue("disableControl", true);
    setFieldValue("btnClass", "d-none");
    setFieldValue("passwordConfirmField", "d-none");
  };
  const handleChanges = (e) => {
    setFieldValue(e.target.id, e.target.value);
  };
  const handleDeleteAccConfirmOpen = () => {
    setFieldValue("deleteAccount", true);
  };
  const handleDeleteAccConfirmClose = () => {
    setFieldValue("deleteAccount", false);
  };
  const handleChangePassOpen = () => {
    setFieldValue("changePassForm", true);
  };
  const handleChangePassClose = () => {
    setFieldValue("changePassForm", false);
  };
  const accountOnDelete = () => {
    request({
      method: "post",
      url: "account/delete/" + window.localStorage.getItem("userId"),
    })
      .then((response) => {
        window.localStorage.removeItem("userId");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("isCompany");
        setFieldValue("redirect", true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const customer = () => {
    return (
      <div className="d-flex flex-dir-column col-12">
        <TextField
          id="name"
          label="Name"
          disabled={values.disableControl}
          onChange={handleChanges}
          value={values.name}
          className="col-12"
        />
        {errors.name && touched.name ? (
          <p className="errorValidationText">{errors.name}</p>
        ) : null}
        <TextField
          id="surname"
          label="Surname"
          disabled={values.disableControl}
          onChange={handleChanges}
          value={values.surname}
          className="col-12"
        />
        {errors.surname && touched.surname ? (
          <p className="errorValidationText">{errors.surname}</p>
        ) : null}
      </div>
    );
  };
  const company = () => {
    return (
      <div className="flex-column col-12">
        <TextField
          id="companyName"
          label="Company Name"
          disabled={values.disableControl}
          onChange={handleChanges}
          value={values.companyName}
          className="col-12"
        />
        {errors.companyName && touched.companyName ? (
          <p className="errorValidationText">{errors.companyName}</p>
        ) : null}
      </div>
    );
  };
  let fields;
  props.usertype === "customer" ? (fields = customer()) : (fields = company());

  let alert;
  values.alertSuccess
    ? (alert = (
        <Alert
          severity="success"
          className="col-12 text-align-center"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                handleAlertShow(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Profile successfully updated!
        </Alert>
      ))
    : (alert = (
        <Alert
          severity="error"
          className="col-12"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                handleAlertShow(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Password change failed! {values.errorMsg}
        </Alert>
      ));

  if (values.redirect) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <div className="d-flex-spacebtw">
        <h1 id="profile-title" className="text-default ml-3 mb-1 mt-1">
          Profile
        </h1>
        <div className="mr-3 flex-row-center">
          <div className="mr-1 ml-1">
            <Button
              variant="contained"
              color="secondary"
              component="span"
              onClick={handleDeleteAccConfirmOpen}
            >
              delete
            </Button>
          </div>
          <Button
            variant="contained"
            color="primary"
            component="span"
            onClick={handleEnable}
          >
            Edit
          </Button>
          <Dialog
            open={values.deleteAccount}
            onClose={handleDeleteAccConfirmClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete your account?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteAccConfirmClose} color="primary">
                No
              </Button>
              <Button color="primary" autoFocus onClick={accountOnDelete}>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <form
        className="d-flex flex-dir-column align-items-center"
        onSubmit={handleSubmit}
      >
        <div className="col-12 mb-2 flex-center">
          <Avatar
            alt="profile photo"
            src={require("./css-styles/images/ava.jpg")}
            className={style.avatar}
          />
              </div>
              <div id="profile" className="col-7 p-4 flex-column-center">
        <div className="col-12 flex-column col-md-12">
          <h3 className="profile-chapters text-default mb-1 mt-1">
            Account info
          </h3>
          <TextField
            id="username"
            label="Username"
            disabled={values.disableControl}
            onChange={handleChanges}
            value={values.username}
            className="col-12"
          />
          {errors.username && touched.username ? (
            <p className="errorValidationText">{errors.username}</p>
          ) : null}
          <div className="mt-2">
            <div id="change-pass-btn" className={values.btnClass}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleChangePassOpen}
              >
                change password
              </Button>
            </div>
          </div>
          <Dialog
            open={values.changePassForm}
            onClose={handleChangePassClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <ChangePassword />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleChangePassClose} color="primary">
                close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className="col-12 flex-column col-md-12">
          <h3 className="profile-chapters text-default mt-4 mb-1">
            Personal info
          </h3>
          {fields}
          <TextField
            id="email"
            label="Email"
            type="email"
            disabled={values.disableControl}
            onChange={handleChanges}
            value={values.email}
            className="col-12"
          />
          {errors.email && touched.email ? (
            <p className="errorValidationText">{errors.email}</p>
          ) : null}
          <TextField
            id="phone"
            label="Phone"
            disabled={values.disableControl}
            onChange={handleChanges}
            value={values.phone}
            className="col-12"
          />
          {errors.phone && touched.phone ? (
            <p className="errorValidationText">{errors.phone}</p>
          ) : null}
                  </div>
                  </div>
        <Collapse className="col-10" in={values.alertShow}>
          {alert}
        </Collapse>
        <div className="flex-row-center mb-1 mt-3">
          <div className={values.btnClass}>
            <Button variant="contained" color="secondary" onClick={handleCancel}>
              cancel
            </Button>
          </div>
          <div className={values.btnClass}>
            <Button type="submit" variant="contained" color="primary">
              confirm
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
