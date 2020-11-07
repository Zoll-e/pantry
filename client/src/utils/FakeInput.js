import React, { useState } from "react";

const Fakeinput = ({
  label,
  type,
  placeholder,
  errors,
  name,
  value,
  onChange,
  autoFocus,
}) => {

  return (
    <div>
      <label>{label}</label>
      <input
        autoFocus={autoFocus}
    type={type}
        className={`${errors ? "invalid" : ""}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {errors && <p>{errors.msg}</p>}
    </div>
  );
};

export default Fakeinput;
