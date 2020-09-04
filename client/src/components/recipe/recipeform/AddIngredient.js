import React, { useState, Fragment } from "react";

function AddIngredient({ addItem }) {
  const [item, setItem] = useState({
    ingredient_name:"",
    portion:"",
  });
  return (
    <Fragment>
      <form>
        <p>Add ingredient</p>
        <input
          type="text"
          name="ingredient_name"
          onChange={e => setItem({ ...item,[e.target.name]: e.target.value })}
        ></input>
        <p>Portion</p>
        <input
          type="text"
          name="portion"
          onChange={e => setItem({ ...item,[e.target.name]: e.target.value })}
        ></input>
        <button
          type="submit"
          onClick={e => {
            e.preventDefault();
            addItem(item);
          }}
        >
          kuld
        </button>
      </form>
    </Fragment>
  );
}

export default AddIngredient;
