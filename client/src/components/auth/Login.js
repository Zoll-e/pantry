import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { Link, Redirect } from "react-router-dom";
import { Groceries } from "../layout/Groceries";
import {removeErrors} from "../../actions/errors";
import { FakeInput } from "../../utils/FakeInput";

const Login = ({ isAuthenticated, login, errors,removeErrors }) => {
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

    login({ email, password });
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <div className="row offset-md-1 col-11 offset-1">
        <div
          className="row border rounded container login"
        >
          <div className="col-md-5 offset-md-1 col-12 offset-1 align-self-center">
            <h1 className="text-primary">Sign in</h1>
            <form onSubmit={e => onSubmit(e)} className="form col-10">
             
             
                <FakeInput 
                label="Email address"
                type="email"
                 placeholder="Enter email"
                 name="email"
                 value={email} 
                 onChange={onChange}
                 errors={errors.email} />
              

<FakeInput
                label="Password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={e => onChange(e)}
                errors={errors.password}
              />
              <button type="submit" className="btn row btn-primary col-4">
                Login
              </button>
            </form>
            <p className="my-1">
              Doesnt have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
          <div
            className="col-md-5  w-100 offset-md-1"
            style={{ maxHeight: "100%" }}
          >
            <Groceries />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  removeErrors: PropTypes.func.isRequired,
};

const mapSateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors,
});

export default connect(mapSateToProps, { login, removeErrors })(Login);
