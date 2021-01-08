import React, { useState, Fragment } from "react";

function AddIngredient({ addItem }) {
  const [item, setItem] = useState({name:"",quantity:""});
  return (
    <Fragment>
      <div>
        <p style={{ fontSize: "25px" }}> Quantity</p>

        <input
          className="newRecipeIngredientInput"
          spellCheck="false"
          autoCorrect="off"
          autoComplete="off"
          type="text"
          value={item.quantity}
          name="quantity"
          onChange={e => setItem({ ...item, [e.target.name]: e.target.value })}
        ></input>
      </div>

      <div>
        <p style={{ fontSize: "25px" }}> Ingredient</p>

        <input
          className="newRecipeIngredientInput"
          type="text"
          spellCheck="false"
          autoCorrect="off"
          autoComplete="off"
          value={item.name}
          name="name"
          onChange={e => setItem({ ...item, [e.target.name]: e.target.value })}
        ></input>
      </div>
      <div></div>
      <button
        style={{
          height: "3em",
          fontFamily: '"Architects Daughter", cursive',
          textDecoration: "none",
          width: "3em",
          borderRadius: "50%",
          marginTop:"3%",
          backgroundColor: "#ffeaa7",
          border: "none",
          visibility:`${!(item.name !== "" && item.quantity !== "") ? "hidden":"visible"}`
        }}
        disabled={!(item.name !== "" && item.quantity !== "")}
        onClick={e => {
          e.preventDefault();

          addItem(item);
          setItem({name:"",quantity:""});
        }}
      >
        +
      </button>
      
    </Fragment>
  );
}

export default AddIngredient;
