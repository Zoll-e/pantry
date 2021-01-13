import React from "react";

const FakeInput = ({
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
      <label className={`${errors ? "invalid-label":""}`}>{errors ? errors.msg : label}</label>
      <input
        autoFocus={autoFocus}
    type={type}
        className={`${errors ? "invalid" : ""}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FakeInput;
