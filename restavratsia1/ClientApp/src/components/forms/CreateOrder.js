import React from "react";
import { useFormik } from "formik";
import {
  Button,
  TextField,
  TextareaAutosize,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
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

export default function CreateOrder(props) {
  const { handleSubmit, setFieldValue, values, errors, touched } = useFormik({
    initialValues: {
      title: "",
      description: "",
      specialization: "",
      alertError: false,
      alertSuccess: false,
      alertShow: false,
    },
    validationSchema,
    onSubmit: () => {
      request({
        method: "post",
        url: "ads/add",
        data: {
          Title: values.title,
          Description: values.description,
          Specialization: values.specialization,
          UserId: window.localStorage.getItem("userId"),
          Image: "",
        },
      })
        .then((resp) => {
          if (resp.status >= 200 && resp.status < 300) {
            handleAlert("alertSuccess", true);
            setTimeout(() => {
              handleAlertShow(true);
            }, 500);
          }
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

  const handleChanges = (e) => {
    setFieldValue(e.target.id, e.target.value);
  };
  const handleAlert = (type, value) => {
    setFieldValue(type, value);
  };
  const handleAlertShow = (value) => {
    setFieldValue("alertShow", value);
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
                handleAlertShow(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Order successfully created! You can close this form.
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
          Some errors occurred creation process.
        </Alert>
      ));

  return (
    <div id="create-order-form" className="col-12 flex-column-center">
      <form
        className="flex-column-center col-7 col-xxs-11"
        onSubmit={handleSubmit}
      >
        <div className="col-12 mt-1 mb-1">
          <h3 className="mt-2 mb-2">Input title for your order</h3>
          <TextField
            id="title"
            label="Title"
            onChange={handleChanges}
            value={values.title}
            className="col-12"
          />
          {errors.title && touched.title ? (
            <p className="errorValidationText">{errors.title}</p>
          ) : null}
        </div>
        <div className="col-12 mt-1 mb-1">
          <h3 className="mt-2 mb-2">Select order specialization</h3>
          <FormControl variant="outlined" className="col-12">
            <InputLabel htmlFor="outlined-age-native-simple">
              Specialization
            </InputLabel>
            <Select
              id="specialization"
              native
              value={values.specialization}
              onChange={handleChanges}
              label="Specialization"
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
          <h3 className="mb-2 mt-2">Add description to your order</h3>
          <TextareaAutosize
            id="description"
            aria-label="minimum height"
            rowsMin={10}
            placeholder="Input here order description"
            className="col-12 text-area"
            value={values.description}
            onChange={handleChanges}
          />
          {errors.description && touched.description ? (
            <p className="errorValidationText">{errors.description}</p>
          ) : null}
        </div>
        <div className="col-12 mt-1 mb-1 flex-center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="col-4"
          >
            create
          </Button>
        </div>
      </form>
      <Collapse className="col-10" in={values.alertShow}>
        {alert}
      </Collapse>
    </div>
  );
}
