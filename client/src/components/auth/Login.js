import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { Link, Redirect } from "react-router-dom";

const Login = ({ isAuthenticated, login }) => {
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
  });
  const {email,password} = formData;

  const onChange = async e => {
      setFormdata({...formData, [e.target.name]:e.target.value});
  }

const onSubmit = async e=> {
    e.preventDefault();
    login({email,password});
}
  if(isAuthenticated){
     return <Redirect to='/recipes' />
  }
  return <Fragment>
      <form onSubmit={e=>onSubmit(e)}>
          <input
          type="text"
          placeholder="Email address"
          name="email"
          value={email}
          onChange={e=>onChange(e)}
          />
              <input
          type="password"
          placeholder="Enter your password"
          name="password"
          value={password}
          onChange={e=>onChange(e)}
          />
<button type="submit">Login</button>
      </form>
      <p>Not a member yet <Link to="register">register</Link> instead</p>

  </Fragment>;
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapSateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapSateToProps, { login })(Login);
