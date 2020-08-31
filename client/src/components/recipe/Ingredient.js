import React from "react";

export const Ingredient = ({ removeItem, id, ingredient }) => {
  return (
    <div>
      <p>{ingredient.name}</p>
      <p>{ingredient.quantity}</p>
      <button onClick={() => removeItem(id)}>X</button>
    </div>
  );
};
