import React, { useEffect, useRef } from "react";
import groceries from "../../../../../groceries.jpeg";
import Auth from "../auth/Auth";

const Modal = ({ setDisplay }) => {
  
  const node = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    var mod = document.body.style;
    document.getElementById("content").style.display = "none";
    mod.overflow = "hidden";
    
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.getElementById("content").style.display = "";
      mod.overflow = "visible";
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
          <Auth setDisplay={setDisplay}/>
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
