import React, { useState, useEffect } from "react";
import Fakeinput from "../../../../../utils/Fakeinput";
import { removeErrors } from "../../../../../actions/errors";
import { login } from "../../../../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Auth = ({ isAuthenticated, login, errors, removeErrors, setDisplay }) => {
  useEffect(() => {
    if (isAuthenticated) {
      setDisplay(false);
    }
  });
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = async e => {
    Object.keys(errors).length > 0 && removeErrors();
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    await login({ email, password });
    if (isAuthenticated) {
    }
  };

  return (
    <div>
      <h1>Sign in!</h1>
      <form onSubmit={e => onSubmit(e)}>
        <Fakeinput
          autoFocus={"autoFocus"}
          label="Email"
          name="email"
          placeholder="Enter your e-mail address"
          type="email"
          value={email}
          errors={errors.email}
          onChange={onChange}
        />
        <Fakeinput
          label={"Password"}
          errors={errors.password}
          name="password"
          placeholder="Please enter your password"
          type="password"
          value={password}
          onChange={onChange}
        />
        <button type="submit">Log in</button>
        Or
        <button>Continue with Google</button>
        <button>Continue with Facebook</button>
      </form>
    </div>
  );
};

Auth.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  removeErrors: PropTypes.func.isRequired,
};

const mapSateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors,
});

export default connect(mapSateToProps, { login, removeErrors })(Auth);
