import React, { Fragment } from "react";

export const Ingredient = ({ removeItem, id, ingredient }) => {
  return (
    <Fragment>
      <div
        style={{
          borderBottomRightRadius: " 15px 3px",
          borderBottomLeftRadius: "15px 3px",
          marginTop: "1%",
          display: "inline-block",
         
          position: "relative",
          marginLeft: "5%",
         
        }}
      >

        <button
          style={{
            fontFamily: '"Architects Daughter", cursive',
            textDecoration: "none",
            borderRadius: "50%",
            width: "2em",
            height: "2em",
            
            backgroundColor: "#ffeaa7",
            border: "none",
          }}
          onClick={() => removeItem(id)}
        >
          -
        </button>
        <p
          style={{
            fontSize:"larger",
            position: "absolute",
            borderBottom: " solid 3px #fdcb6e",
            marginLeft:"3em",
            top: "50%",

            transform: "translateY(-50%)",
          }}
        >
          {ingredient.quantity} {ingredient.unit} - {ingredient.name}
        </p>
      </div>
    </Fragment>
  );
};
