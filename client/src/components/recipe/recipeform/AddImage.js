import React, { Fragment, useRef } from "react";
import backGround from "./popartBackground.jpg";

const AddImage = ({ image, setImage, errors }) => {
  const onChange = e => {
    setImage(e.target.files[0]);
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
        accept="image/x-png,image/jpeg"
        ref={inputFile}
        onChange={onChange}
        style={{ display: "none" }}
      ></input>

      <div>
        <img
        style={{borderRadius:"5px"}}
          src={
            image
              ? URL.createObjectURL(image)
              : backGround
          }
          onClick={onClick}
          alt="4234"
          className="newRecipeAddImage"
        ></img>
        {errors && <p style={{ color: "red" }}>{errors.msg}</p>}
      </div>
    </Fragment>
  );
};

export default AddImage;
