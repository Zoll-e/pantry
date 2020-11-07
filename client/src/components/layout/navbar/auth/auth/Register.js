import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../../../../actions/auth";
import { Redirect } from "react-router-dom";
import { removeErrors } from "../../../../../actions/errors";


const Register = ({
  isAuthenticated,
  register,
  setDisplay,
  errors,
  removeErrors,
}) => {
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const [password2Validation, setPassword2Validation] = useState("");
  const node = useRef();

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = e => {
    if (!node.current.contains(e.target)) {
      setDisplay(false);

      return;
    }
  };

  const onChange = async e => {
    Object.keys(errors).length > 0 && removeErrors();
    setPassword2Validation("");
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    password2 === "" &&
      setPassword2Validation({ msg: "Password confirmation required" }) &&
      console.log(password2Validation);
    password2 !== password &&
      setPassword2Validation({ msg: "Passwords doesn't match" });
    register(name, email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div
      id="modal"
      ref={node}
    
    ></div>
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
