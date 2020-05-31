import React from "react";
import { useFormik } from "formik";
import { Redirect } from "react-router-dom";
import {
  Button,
  TextField,
  TextareaAutosize,
  FormControl,
  Select,
  createMuiTheme,
  responsiveFontSizes,
  CardContent,
  ThemeProvider,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton, Collapse } from "@material-ui/core";
import * as Yup from "yup";
import request from "../Utils/RequestWrapper";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(4, "too short(min 4 characters)")
    .max(50, "too long(max 50 characters)")
    .required("this field is required"),
  description: Yup.string()
    .min(20, "too short(min 20 characters)")
    .max(500, "too long(max 500 characters)"),
  specialization: Yup.string().required("this field is required"),
});

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

export default function UpdateOrder(props) {
  const { handleSubmit, setFieldValue, values, errors, touched } = useFormik({
    initialValues: {
      title: props.title,
      description: props.description,
      specialization: props.specialization,
      alertError: false,
      alertSuccess: false,
      alertShow: false,
      disabled: true,
      buttonConfirm: "d-none",
      deleteOrder: false,
      redirect: false,
    },
    validationSchema,
    onSubmit: () => {
      request({
        method: "put",
        url: "ads/alter/" + props.id,
        data: {
          Title: values.title,
          Description: values.description,
          Specialization: values.specialization,
          UserId: window.localStorage.getItem("userId"),
          Image: "",
        },
      })
        .then((resp) => {
          handleEditFalse();
          handleAlert("alertSuccess", true);
          setTimeout(() => {
            handleAlertShow(true);
          }, 500);
        })
        .catch((err) => {
          handleAlert("alertError", true);
          setTimeout(() => {
            handleAlertShow(true);
          }, 500);
        });
    },
  });

  const specOptions = [
    "facade (buildings)",
    "interior work (buildings)",
    "furniture",
    "sculptures / monuments",
    "paintings",
    "metal products",
    "wood products",
    "vehicles",
    "electronic devices",
    "other",
  ];

  const handleDeleteOrderConfirmOpen = () => {
    setFieldValue("deleteOrder", true);
  };
  const handleDeleteOrderConfirmClose = () => {
    setFieldValue("deleteOrder", false);
  };
  const orderOnDelete = () => {
    request({
      method: "delete",
      url: "ads/delete/" + props.id,
    })
      .then((resp) => {
        setFieldValue("redirect", true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChanges = (e) => {
    setFieldValue(e.target.id, e.target.value);
  };
  const handleAlert = (type, value) => {
    setFieldValue(type, value);
  };
  const handleAlertShow = (value) => {
    setFieldValue("alertShow", value);
  };
  const handleEditTrue = () => {
    setFieldValue("disabled", false);
    setFieldValue("buttonConfirm", "");
  };
  const handleEditFalse = () => {
    setFieldValue("disabled", true);
    setFieldValue("buttonConfirm", "d-none");
  };

  if (values.redirect) {
    return (
      <Redirect
        to={"/customer-office/" + window.localStorage.getItem("userId")}
      />
    );
  }

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
          Order successfully updated!
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
          Order update failed!
        </Alert>
      ));

  return (
    <div id="update-order-form" className="col-12 flex-column-center">
      <div className="col-11 d-flex align-items-start flex-dir-row mt-2 ml-3">
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={handleEditTrue}
        >
          Edit
        </Button>
        <div className="mr-2 ml-2">
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={handleDeleteOrderConfirmOpen}
          >
            delete
          </Button>
          <Dialog
            open={values.deleteOrder}
            onClose={handleDeleteOrderConfirmClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete your order?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteOrderConfirmClose} color="primary">
                No
              </Button>
              <Button color="primary" autoFocus onClick={orderOnDelete}>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <CardContent className="width100 flex-column-center">
        <ThemeProvider theme={theme}>
          <form
            className="flex-column-center col-11 col-xxs-11"
            onSubmit={handleSubmit}
          >
            <div className="col-12 mt-1 mb-1">
              <h3 className="mt-2 mb-2">Date</h3>
              <Typography gutterBottom variant="h6" component="h3">
                {props.date.substring(0, 10)}
              </Typography>
            </div>
            <div className="col-12 mt-1 mb-1">
              <h3 className="mt-2 mb-2">Title</h3>
              <TextField
                id="title"
                onChange={handleChanges}
                value={values.title}
                className="col-12"
                disabled={values.disabled}
              />
              {errors.title && touched.title ? (
                <p className="errorValidationText">{errors.title}</p>
              ) : null}
            </div>
            <div className="col-12 mt-1 mb-1">
              <h3 className="mt-2 mb-2">Specialization</h3>
              <FormControl variant="outlined" className="col-12">
                <Select
                  id="specialization"
                  native
                  value={values.specialization}
                  onChange={handleChanges}
                  disabled={values.disabled}
                >
                  <option aria-label="None" value="" />
                  {specOptions.map((elem) => {
                    return <option value={elem}>{elem}</option>;
                  })}
                </Select>
                {errors.specialization && touched.specialization ? (
                  <p className="errorValidationText">{errors.specialization}</p>
                ) : null}
              </FormControl>
            </div>
            <div className="col-12 mt-1 mb-1">
              <h3 className="mb-2 mt-2">Description</h3>
              <TextareaAutosize
                id="description"
                aria-label="minimum height"
                rowsMin={10}
                placeholder="Input here order description"
                className="col-12 text-area"
                value={values.description}
                onChange={handleChanges}
                disabled={values.disabled}
              />
              {errors.description && touched.description ? (
                <p className="errorValidationText">{errors.description}</p>
              ) : null}
            </div>
            <div className={values.buttonConfirm}>
              <div className="flex-row-center">
                <div className="ml-3 mr-3">
                  <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    color="primary"
                  >
                    Confirm
                  </Button>
                </div>
                <div className="mr-3 ml-3">
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={handleEditFalse}
                  >
                    cancel
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </ThemeProvider>
      </CardContent>
      <Collapse className="col-10" in={values.alertShow}>
        {alert}
      </Collapse>
    </div>
  );
}
