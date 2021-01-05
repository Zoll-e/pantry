import React, { Fragment, useRef } from "react";

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
        ref={inputFile}
        onChange={onChange}
        style={{ display: "none" }}
      ></input>

      <div>
        <img
          src={
            image
              ? URL.createObjectURL(image)
              : "https://professionals.tarkett.com/media/img/M/THH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg"
          }
          onClick={onClick}
          alt="4234"
          className="col-12"
          style={{ height: "500px" }}
        ></img>
        {errors && <p style={{ color: "red" }}>{errors.msg}</p>}
      </div>
    </Fragment>
  );
};

export default AddImage;
