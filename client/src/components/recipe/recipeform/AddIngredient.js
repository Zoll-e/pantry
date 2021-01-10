import React, { useState, Fragment } from "react";
import ingredienList from "./ingredientList";

function AddIngredient({ addItem }) {
  const [item, setItem] = useState({ name: "", quantity: "", unit: "adag" });

  return (
    <Fragment>
      <div>
        <p style={{ fontSize: "25px" }}> Quantity</p>

        <input
          className="newRecipeIngredientInput"
          spellCheck="false"
          autoCorrect="off"
          autoComplete="off"
          type="number"
          value={item.quantity}
          name="quantity"
          onChange={e => setItem({ ...item, [e.target.name]: e.target.value })}
        ></input>
      </div>

      <div>
        <label>
          Pick a unit of measure
        <select
          className="newRecipeIngredientInput"
          name="unit"
          value={item.unit}
          onClick={e => console.log(item.unit)}
          onChange={e => setItem({ ...item, [e.target.name]: e.target.value })}
        >
          {ingredienList.map((e, index) => (
            <option key={index}>{e}</option>
          ))}
        </select>
        </label>
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
          marginTop: "3%",
          backgroundColor: "#ffeaa7",
          border: "none",
          visibility: `${
            !(item.name !== "" && item.quantity !== "" && item.unit !== "")
              ? "hidden"
              : "visible"
          }`,
        }}
        disabled={
          !(item.name !== "" && item.quantity !== "" && item.unit !== "")
        }
        onClick={e => {
          e.preventDefault();

          addItem(item);
          setItem({ name: "", quantity: "",unit:item.unit });
        }}
      >
        +
      </button>
    </Fragment>
  );
}

export default AddIngredient;
