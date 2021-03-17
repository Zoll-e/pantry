import React, { useEffect, useRef } from "react";
import groceries from "../../../../groceries.jpeg";
import Auth from "./Auth";


const Modal = ({ setDisplay, display }) => {
  const node = useRef();

  useEffect(() => {
    var mod = document.body.style;
   
      document.addEventListener("mousedown", handleClick);
      mod.backgroundColor = "";


    return () => {
      document.removeEventListener("mousedown", handleClick);
      mod.position = "visible";
    };
  });

  const handleClick = e => {
    if (!node.current.contains(e.target)) {
      setDisplay(false);
      return;
    }
  };

  return (
    <div
      style={{
        display: `${display ? "" : "none"}`,
        position: "absolute",
        height: "100rem",
        width: "100%",
        zIndex: "2",
        backdropFilter: "blur(7px)",
      }}
    >
      <div id="modal" ref={node}>
        <div
          style={{
            display: "inline-block",
            float: "left",
            width: "50%",
            height: "100%",
          }}
        >
          <Auth setDisplay={setDisplay} />
        </div>
        <div
          style={{
            width: "50%",
            height: "100%",
            display: "inline-block",
          }}
        >
          <img
            src={groceries}
            alt=""
            style={{
              height: "100%",
              width: "100%",
              borderTopRightRadius: "5px",
              borderBottomRightRadius: "5px",
            }}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Modal;
