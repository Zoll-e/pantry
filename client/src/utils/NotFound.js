import React from "react";
import fourohfour from "../404.jpg";
const NotFound = () => {
  return (
    <div
      style={{ position: "absolute", margin: "auto", left: "0", right: "0" }}
    >
      <img
        style={{
          position: "absolute",
          margin: "auto",
          left: "0",
          right: "0",
          marginTop: "3%",
        }}
        alt="pic_place"
        src={fourohfour}
      ></img>
    </div>
  );
};

export default NotFound;
