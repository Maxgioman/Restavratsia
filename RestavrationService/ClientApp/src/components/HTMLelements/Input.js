import React, { Component } from "react";

const Input = (props) => {
  return (
    <div className="col-12 text-indent-0">
      <input
        className={props.className}
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default Input;
