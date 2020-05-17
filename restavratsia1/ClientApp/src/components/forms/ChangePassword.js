import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse/Collapse";
import addPassConfirmMethod from "../Utils/GlobalMethods";
import request from "../Utils/RequestWrapper";

addPassConfirmMethod();

const validationSchema = Yup.object().shape({
  passOld: Yup.string().required("this field is required"),
  passNew: Yup.string()
    .min(8, "too short")
    .max(16, "too long")
    .matches(
      "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,16}$",
      "password must contain at least 1 [A-Z], 1 [a-z] and 1 [0-9] characters and it length should be 8-16 characters"
    )
    .required("this field is required"),
  passNewConfirm: Yup.string()
    .when("passNew", {
      is: (val) => !!(val && val.length > 0),
      then: Yup.string().oneOf([Yup.ref("passNew")], "password must match"),
    })
    .required("this field is required"),
});

export default function ChangePassword() {
  const {
    handleSubmit,
    setFieldValue,
    handleChange,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      passOld: "",
      passNew: "",
      passNewConfirm: "",
      alertError: false,
      alertSuccess: false,
      errorMsg: "",
    },
    validationSchema,
    onSubmit: () => {
      request({
        method: "post",
        url: "account/edit/password/" + window.localStorage.getItem("userId"),
        data: {
          OldPassword: values.passOld,
          NewPassword: values.passNew,
          NewPasswordConfirm: values.passNewConfirm,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            handleAlert("alertSuccess", true);
          }
        })
        .catch((error) => {
          if (error.data.errors) {
            if (error.data.errors.OldPassword)
              setFieldValue("errorMsg", error.data.errors.OldPassword[0]);
          } else setFieldValue("errorMsg", error.data[0].description);
          handleAlert("alertError", true);
        });
    },
  });

  const handleAlert = (type, value) => {
    setFieldValue(type, value);
  };

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
                handleAlert("alertSuccess", false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Password changed! You can close this window.
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
                handleAlert("alertError", false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Password change failed! {values.errorMsg}
        </Alert>
      ));

  return (
    <form onSubmit={handleSubmit} className="flex-column-center">
      <div className="mb-1 max-width">
        <TextField
          id="passOld"
          label="Old password"
          onChange={handleChange}
          value={values.passOld}
          type="password"
          className="col-12"
        />
        {errors.passOld && touched.passOld ? (
          <p className="errorValidationText">{errors.passOld}</p>
        ) : null}
      </div>
      <div className="mb-1 mt-1 max-width">
        <TextField
          id="passNew"
          label="New password"
          onChange={handleChange}
          value={values.passNew}
          type="password"
          className="col-12"
        />
        {errors.passNew && touched.passNew ? (
          <p className="errorValidationText maxwidth-inherit">
            {errors.passNew}
          </p>
        ) : null}
      </div>
      <div className="mb-1 mt-1 max-width">
        <TextField
          id="passNewConfirm"
          label="Confirm new password"
          onChange={handleChange}
          value={values.passNewConfirm}
          type="password"
          className="col-12"
        />
        {errors.passNewConfirm && touched.passNewConfirm ? (
          <p className="errorValidationText maxwidth-inherit">
            {errors.passNewConfirm}
          </p>
        ) : null}
      </div>
      <div className="mt-1">
        <Button type="submit" variant="contained" color="primary">
          confirm
        </Button>
      </div>
      <Collapse
        className="col-10"
        in={values.alertError || values.alertSuccess}
      >
        {alert}
      </Collapse>
    </form>
  );
}
