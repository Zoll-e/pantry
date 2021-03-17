import React from "react";
import "./styles.css";

const RecipeTop = ({ dish, intro, picture, user, vegan }) => {
  return (
    <div>
      <h1 className="recipe-show-title">{dish}</h1>
  <h5 className="recipe-show-title" style={{fontSize:"medium",marginTop:"0%",letterSpacing:"normal"}}>By {user}</h5>
      <div className="recipe-top-container">
        <div
          className="recipe-top-image"
          style={{
            backgroundImage: `URL(/${picture})`,
          }}
        ></div>

        <div className="recipe-top-intro">
          <p>{intro}</p>
        </div>
        
      </div>
      <h3
        style={{
          width:"95%",
            backgroundColor:" rgba(253, 203, 110, 0.4)",
          borderRadius:"5px",
          margin:"auto",
          marginTop:"10%",
          padding: "2.3%",
          
        }}
      >
         vegan:{vegan} icon: 30min icon: 1.5ora
        icon 2ora icon:4.5 icon: 3{" "}
      </h3>
    </div>
  );
};

export default RecipeTop;
