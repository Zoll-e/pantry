import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { logOut } from "../../../../actions/auth";
import { connect } from "react-redux";
import Hamburger from "../parts/Hamburger";
import About from "../parts/About";
import CV from "../parts/CV";
import Modal from "../auth/Modal"

const Navbar = ({ logOut, auth: { isAuthenticated, loading, user } }) => {
  const [display, setDisplay] = useState(false);

  const history = useHistory();

  const returnHome =() => {
    let path = '/';
    history.push(path);
  }
  const authLinks = (
    <Fragment>
      <li className="element">
        <Link to="/add-recipe" style={{textDecoration:"inherit",color:"inherit"}}>Add new recipe</Link>
      </li>
      <li className="element">Messages</li>
      <li className="element">Favorites</li>
      <li className="element">My Recipes</li>

      <li className="element" onClick={e=>{logOut();window.location.reload()}}>
        Logout
      </li>
    </Fragment>
  );
  const guestLinks = (
    <li className="element" onClick={e => setDisplay(true)}>
      Login
    </li>
  );

  return (
    <Fragment>
      <div className="nav">
        {display && <Modal setDisplay={setDisplay} />}
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
        <div className="logo">
          <h2 onClick={e => returnHome() }>thePantry</h2>
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
