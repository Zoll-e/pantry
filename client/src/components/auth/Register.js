import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import {setAlert} from "../../actions/alert";
import { Link, Redirect } from "react-router-dom";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onSbumit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords doesnt match","danger");
    } else {
      register({ name, email, password });
    }
  };

  const onChange = async e =>{
      setFormData({...formData,[e.target.name]:e.target.value});
  }

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <form onSubmit={e => onSbumit(e)}>
        <div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
          />
        </div>

        <div>
          <input 
          type="text"
          placeholder="email"
          name="email"
          value={email}
          onChange={e => onChange(e)} />
          </div>

          <div>
          <input 
          type="password"
          placeholder="password"
          name="password"
          minLength="6"
          value={password}
          onChange={e => onChange(e)} />
          </div>

          <div>
          <input 
          type="password"
          placeholder="password"
          name="password2"
          minLength="6"
          value={password2}
          onChange={e => onChange(e)} />
          </div>
          <input type="submit" 
          value="Register"/>
      </form>
      <p>Already a user <Link to="login">login</Link> instead</p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {  setAlert, register })(Register);
