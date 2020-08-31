import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logOut } from "../../actions/auth";
import { connect } from "react-redux";
import Login from "../auth/Login";

const Navbar = ({ logOut, auth: { isAuthenticated, loading, user }}) => {
  const authLinks = (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Recipes
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/">
          { user !== null && user.name.trim().split(" ")[0]  }
        </Link>
      </li>
    </Fragment>
  );
  const questLinks = (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/recipes">
          Recipes
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
    </Fragment>
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Pantry
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {isAuthenticated && !loading ? authLinks : questLinks}
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              {isAuthenticated && (
                <Fragment>
                  <div className="dropdown-divider"></div>

                  <a className="dropdown-item" onClick={logOut}>
                    Logout
                  </a>
                </Fragment>
              )}
            </div>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
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
