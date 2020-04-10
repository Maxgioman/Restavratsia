import React from "react";

const Select = (props) => {
  return (
    <div className="col-12 text-indent-0">
      <select
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        className={props.className}
      >
        <option value="" disabled>
          {props.placeholder}
        </option>
        {props.options.map((option) => {
          return (
            <option key={option} value={option} label={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
