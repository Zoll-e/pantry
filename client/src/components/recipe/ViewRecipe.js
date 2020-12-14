import React, { Fragment, useEffect, useRef } from "react";

const ViewRecipe = ({ setView, picture }) => {
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
      setView(false);
      return;
    }
  };

  return (
    <Fragment>
      <div
        style={{
          position: "absolute",
          backgroundImage: `url(${picture})`,
          width: "55rem",
          zIndex: "6",
          margin: "auto",
          height: "100vh",
          border: "red 1px solid",
        }}
        ref={node}
      ></div>
    </Fragment>
  );
};

export default ViewRecipe;
