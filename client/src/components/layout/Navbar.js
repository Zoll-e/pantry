import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logOut } from "../../actions/auth";
import { connect } from "react-redux";

const Navbar = ({ logOut, auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/recipes">Recipes</Link>
        </li>
        <li>
          <a onClick={logOut} href="#!">
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
  const questLinks = (
   
      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Sign in</Link>
        </li>

        <li>
          <Link to="/recipes">Recipes</Link>
        </li>
      </ul>);
  return (
<div>      {!loading && (
        <Fragment> {isAuthenticated ? authLinks : questLinks}</Fragment>
      )}
    </div>
  );
};

Navbar.propTypes = {
  logOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(Navbar);
