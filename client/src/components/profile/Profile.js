import React from "react";
import { logOut } from "../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const Profile = ({ logOut }) => {
  const history = useHistory();

  return (
    <div>
      <h1
        style={{ cursor: "pointer" }}
        onClick={() => {
          logOut();
          history.push("/");
        }}
      >
        Logout
      </h1>
    </div>
  );
};

Profile.propTypes = {
  logOut: PropTypes.func.isRequired,
};

export default connect(null, { logOut })(Profile);
