import React from "react";
import "./styles.css";

const RecipeMiddle = ({ ingredients, directions }) => {
  
  return (
    <div className="recipe-middle-container">
      <div className="recipe-middle-ingredients">
        <h2>Ingredients:</h2>

        {ingredients.map((e, i) => (
          <div
            
            key={i}
          >
            <p onClick={ e => 
            
            e.target.style.textDecoration === "" ? e.target.style.textDecoration = "line-through" : e.target.style.textDecoration = ""
          }style={{ width: "fit-content" }}>
              {e.quantity + "-" + e.unit + "-" + e.name}
            </p>
          </div>
        ))}
      </div>

      <div className="recipe-middle-directions">
        <h2>Directions:</h2>
        {directions.map((e, index) => (
          <p style={{ padding: "2% 10%" }} key={index}>
            {index + 1} - {e}
          </p>
        ))}
      </div>
    </div>
  );
};

export default RecipeMiddle;
