import React, { Fragment, useRef } from "react";
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

  const inputFile = useRef(null);
  const onClick = () => {
    inputFile.current.click();
  };

  return (
    <Fragment>
      <input
        type="file"
        id="file"
        ref={inputFile}
        onChange={onChange}
        style={{ display: "none" }}
      ></input>

      <div method="post" encType="multipart/form-data">
        <img src={image ? image : "https://professionals.tarkett.com/media/img/M/THH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg"} onClick={onClick} alt="" className="col-12" style={{height:"500px"}}></img>
        {errors && <p style={{ color: "red" }}>{errors.msg}</p>}
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
