import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { upload } from "../../../actions/image";

const AddImage = ({ upload }) => {
  const [photo, setPhoto] = useState(null);

  const onChange = e => {
    setPhoto(e.target.files[0]);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (photo) {
      upload(photo);
    }
  };

  return (
    <div>
      <div
        method="post"
        encType="multipart/form-data"
      >
          <span>Choose photo to upload</span>
          <input type="file" name="photo" onChange={onChange} />
        
        <button
                onClick={onSubmit}

          variant="primary"
          type="submit"
          disabled={photo ? false : true}
        >
          Upload
        </button>
      </div>
    </div>
  );
};


AddImage.propTypes = {
  upload: PropTypes.func.isRequired,
};

export default connect(null, { upload })(AddImage);
