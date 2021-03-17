import React  from "react";

function Star({ isFilled, setRate,rateRecipe, index,recipeId }) {
  return (
    <div
    style={{cursor:"pointer"}}
      onMouseEnter={e => setRate(index)}
      onMouseLeave={e => setRate(-1)}
      onClick={e=>rateRecipe(recipeId,index)}
    >
      <div
        style={{
          backgroundColor: `${isFilled ? "orange" : "gray"}`,
          height: "2.5ch",
          width: "2.5ch",
          clipPath:
            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
      ></div>
    </div>
  );
}

export default Star;
