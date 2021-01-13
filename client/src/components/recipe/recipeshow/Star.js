import React  from "react";

function Star({ isFilled, setRate,rateRecipe, index,recipeId }) {
  return (
    <div
      onMouseEnter={e => setRate(index)}
      onMouseLeave={e => setRate(-1)}
      onClick={e=>rateRecipe(recipeId,index)}
    >
      <div
        style={{
          backgroundColor: `${isFilled ? "orange" : "gray"}`,
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
