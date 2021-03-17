import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { logOut } from "../../../../actions/auth";
import { connect } from "react-redux";

import About from "../parts/About";
import CV from "../parts/CV";
import Modal from "../auth/Modal";
import "./styles.css";

const Navbar = ({ logOut, auth: { isAuthenticated, loading, user } }) => {
  const [display, setDisplay] = useState(false);

  const history = useHistory();


  const authLinks = (
    <Fragment>
      <Link style={{ marginLeft: "2%" }} to="/profile">
        {" "}
        Profile
      </Link>{" "}
      <Link style={{ marginLeft: "2%" }} to="/add-recipe">
        {" "}
        New
      </Link>
      <p style={{ marginLeft: "2%" }}>Messages</p>
    </Fragment>
  );

  const guestLinks = (
    <p style={{ marginLeft: "2%" }} onClick={e => setDisplay(true)}>
      Login
    </p>
  );

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        backgroundColor: "gray",
        marginBottom: "3%",
        color: "white",
        padding: "1% 1%",
        position: "relative",
        textAlign: "right",
        display: "flex",
        flexDirection: "row-reverse",
      }}
    >
      <Modal setDisplay={setDisplay} display={display} />
      <div
        onClick={()=>history.push("/")}
        style={{
          cursor: "pointer",
          width: "fit-content",
          backgroundColor: "black",
          color: "white",
          position: "absolute",
          padding: "1.5%",
          textAlign: "center",
          left: "0",
          right: "0",
          top: "0",
          margin: "auto",
        }}
      >
        <h1>thePantry</h1>
      </div>

      {!loading && (isAuthenticated ? authLinks : guestLinks)}
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
