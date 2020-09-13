import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logOut } from "../../actions/auth";
import { connect } from "react-redux";
import Login from "../auth/Login";

const Navbar = ({ logOut, auth: { isAuthenticated, loading, user } }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const authLinks = (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Recipes
        </Link>
      </li>
    </Fragment>
  );
  const questLinks = (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Recipes
        </Link>
      </li>
    </Fragment>
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Login show={show} handleClose={handleClose} />

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
              href="#!"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {user !== null && isAuthenticated
                ? user.name.trim().split(" ")[0]
                : "Profile"}
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              {!isAuthenticated && (
                <Fragment>
                  <span className="dropdown-item" onClick={handleShow}>
                    Login
                  </span>
                </Fragment>
              )}
              {isAuthenticated && (
                <Fragment>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                  <Link className="dropdown-item" to="/add-recipe">
                    Add recipe
                  </Link>
                  <div className="dropdown-divider"></div>

                  <span className="dropdown-item" onClick={logOut}>
                    Logout
                  </span>
                </Fragment>
              )}
            </div>
          </li>
        </ul>
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
