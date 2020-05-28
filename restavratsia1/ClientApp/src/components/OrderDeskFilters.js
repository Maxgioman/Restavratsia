import React from "react";
import { Checkbox, FormGroup, FormControlLabel } from "@material-ui/core";

function OrderDeskFilters() {
  const [state, setState] = React.useState({
    checked1: false,
    checked2: false,
    checked3: false,
    checked4: false,
    checked5: false,
    checked6: false,
    checked7: false,
    checked8: false,
    checked9: false,
    checked10: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

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

  return (
    <FormGroup className="flex-column-start" lab>
      <h3 className="text text-indent-0">Specialization</h3>
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checked1}
            onChange={handleChange}
            name="checked1"
            color="default"
          />
        }
        label={specOptions[0]}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checked2}
            onChange={handleChange}
            name="checked2"
            color="default"
          />
        }
        label={specOptions[1]}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checked3}
            onChange={handleChange}
            name="checked3"
            color="default"
          />
        }
        label={specOptions[2]}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checked4}
            onChange={handleChange}
            name="checked4"
            color="default"
          />
        }
        label={specOptions[3]}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checked5}
            onChange={handleChange}
            name="checked5"
            color="default"
          />
        }
        label={specOptions[4]}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checked6}
            onChange={handleChange}
            name="checked6"
            color="default"
          />
        }
        label={specOptions[5]}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checked7}
            onChange={handleChange}
            name="checked7"
            color="default"
          />
        }
        label={specOptions[6]}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checked8}
            onChange={handleChange}
            name="checked8"
            color="default"
          />
        }
        label={specOptions[7]}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checked9}
            onChange={handleChange}
            name="checked9"
            color="default"
          />
        }
        label={specOptions[8]}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checked10}
            onChange={handleChange}
            name="checked10"
            color="default"
          />
        }
        label={specOptions[9]}
      />
    </FormGroup>
  );
}

export default OrderDeskFilters;
