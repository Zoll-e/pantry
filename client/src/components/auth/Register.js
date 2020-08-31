import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import { Link, Redirect } from "react-router-dom";
import { Groceries } from "../layout/Groceries";
import { removeErrors } from "../../actions/auth";
import { FakeInput } from "../../utils/FakeInput";

const Register = ({ isAuthenticated, register, errors, removeErrors }) => {
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    password2:"",
    errors:{}
  });
  const { name, email, password, password2 } = formData;
  const [password2Validation ,setPassword2Validation] = useState("");

  const onChange = async e => {
    Object.keys(errors).length > 0 && removeErrors();
    setPassword2Validation("");
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    password2==="" && setPassword2Validation({msg:"Password confirmation required"}) && console.log(password2Validation);
    password2 !== password && setPassword2Validation({msg:"Passwords doesn't match"});
    register({ name, email, password });
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <div className="row offset-md-1 col-11 offset-1">
        <div
          className="row border rounded container register"
         // style={{ height: "600px", maxWidth: "650px", maxHeight: "66=0px" }}
        >
          <div className="col-md-5 offset-md-1 col-12 offset-1 align-self-center">
            <h1 className="text-primary">Register</h1>
            <form onSubmit={e => onSubmit(e)} className="form col-10">
              <FakeInput
                label="Your name"
                type="name"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={onChange}
                errors={errors.name}
              />
              <FakeInput
                label="Email address"
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={onChange}
                errors={errors.email}
              />

              <FakeInput
                label="Password"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={e => onChange(e)}
                errors={errors.password}
              />
              <FakeInput
                label="Confirm password"
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={e => onChange(e)}
                errors={password2Validation}
              />
              <button type="submit" className="btn row btn-primary col-5">
                Register
              </button>
            </form>
            <p className="my-1">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
          <div
            className="col-md-5 col-sm-11 w-100 offset-sm-1"
            style={{ maxHeight: "100%" }}
          >
            <Groceries />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  removeErrors: PropTypes.func.isRequired,
};

const mapSateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors,
});

export default connect(mapSateToProps, { register, removeErrors })(Register);
