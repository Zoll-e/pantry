import React, { Fragment, useState,useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logOut, register } from "../../../../actions/auth";
import { connect } from "react-redux";
import Hamburger from "../parts/Hamburger";
import About from "../parts/About";
import CV from "../parts/CV";
import Modal from "../auth/modal/Modal";

const Navbar = ({ logOut, auth: { isAuthenticated, loading, user } }) => {
  const [display, setDisplay] = useState(false);

  const authLinks = <li className="element" onClick={logOut}>Logout</li>;
  const guestLinks =  <li className="element" onClick={e => setDisplay(true)}>
  Login
</li>

  return (
    <Fragment>
      <div className="nav">
        {display && <Modal setDisplay={setDisplay} /> }
        <div id="hamburger">
          <Hamburger />
          <div id="content">
            <ul>
              {isAuthenticated ? authLinks : guestLinks}
             
              <li className="element">
                About
                <About />
              </li>

              <li className="element">
                My CV!
                <CV />
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className="logo">thePantry</h2>
        </div>
      </div>
    </Fragment>
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
