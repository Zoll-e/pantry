import React, { Fragment } from "react";

export const FakeInput = ({
  label,

  type,
  errors,
  placeholder,
  name,
  value,
  onChange,
}) => {
  return (
    <Fragment>
      <div className="form-group row">
        <label>{label}</label>
        <input
          type={type}
          className={`form-control ${errors && "is-invalid"}`}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
        {errors && <div className="invalid-feedback">{errors.msg}</div>}
      </div>
    </Fragment>
  );
};
