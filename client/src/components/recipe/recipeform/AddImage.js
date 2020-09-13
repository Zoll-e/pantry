import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { upload, clearOldPicture } from "../../../actions/image";

const AddImage = ({ upload, clearOldPicture, errors, image }) => {

  const onChange = e => {
    if (image) {
      clearOldPicture(image);
    }
    upload(e.target.files[0]);
  };

  return (
    <Fragment>
      <div method="post" encType="multipart/form-data">
        <span>Choose photo to upload</span>
        <input type="file" name="picture" onChange={onChange} />
        {errors && <p style={{color:"red"}}>{errors.msg}</p>}

      </div>
    </Fragment>
  );
};

AddImage.propTypes = {
  upload: PropTypes.func.isRequired,
  clearOldPicture: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  image: state.image.route,
});
export default connect(mapStateToProps, { upload, clearOldPicture })(AddImage);
