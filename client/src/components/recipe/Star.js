import React, { useState } from "react";

function Star({ filled, index,setHoverIndex }) {
  return (
    <div
      onMouseEnter={e => {setHoverIndex(index)}}
      onMouseLeave={e => {setHoverIndex(null)
      }}
    >
      <div
        style={{
          backgroundColor: `${filled ? "orange" : "gray"}`,
          height: "4ch",
          width: "4ch",
          clipPath:
            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
      ></div>
    </div>
  );
}

export default Star;
