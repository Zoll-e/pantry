import React, { useState, useEffect, Fragment } from "react";
import Fakeinput from "../../../../utils/FakeInput";
import { removeErrors } from "../../../../actions/errors";
import { login, register } from "../../../../actions/auth"
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Auth = ({
  isAuthenticated,
  login,
  register,
  errors,
  removeErrors,
  setDisplay,
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      setDisplay(false);
    }
  });

  const [isRegister, setRegister] = useState(false);

  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const onChange = async e => {
    Object.keys(errors).length > 0 && removeErrors();
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
   isRegister ? register (name, email.toLowerCase(),password) : login(email.toLowerCase(),password);
  };

  const loginPage = (
    <Fragment>
      <h1>Sign in!</h1>
      <form onSubmit={e => onSubmit(e)}>
        <Fakeinput
          autoFocus={"autoFocus"}
          label="Email"
          name="email"
          placeholder={"Enter your e-mail address"}
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
        <p>Or</p>
        <button>Continue with Google</button>
        <button>Continue with Facebook</button>
      </form>
      <p>
        Doesn't have an account{" "}
        <b
          style={{ cursor: "pointer" }}
          onClick={e => {
            removeErrors();
            setFormdata({name:"",email:"",password:""});
            setRegister(true);
          }}
        >
          Sign up
        </b>{" "}
        instead
      </p>
    </Fragment>
  );

  const registerPage = (
    <Fragment>
      <h1>Sign Up!</h1>
      <form onSubmit={e => onSubmit(e)}>
        <Fakeinput
          autoFocus={"autoFocus"}
          label="Name"
          name="name"
          placeholder={"Enter your name"}
          type="text"
          value={name}
          errors={errors.name}
          onChange={onChange}
        />
        <Fakeinput
          label="Email"
          name="email"
          placeholder={"Enter your e-mail address"}
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
      
        <button type="submit">Register</button>
        <p>Or</p>
        <button>Sign up with Google</button>
        <button>Sign up with Facebook</button>
      </form>
      <p>
        Already have an account{" "}
        <b
          style={{ cursor: "pointer" }}
          onClick={e => {
            removeErrors();
            setFormdata({email:"",password:""});
            setRegister(false);
          }}
        >
          Sign in
        </b>{" "}
        instead
      </p>
    </Fragment>
  );

  return (
    <div className="authPage">{!isRegister ? loginPage : registerPage}</div>
  );
};

Auth.propTypes = {
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  removeErrors: PropTypes.func.isRequired,
};

const mapSateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors,
});

export default connect(mapSateToProps, { login, register, removeErrors })(Auth);
