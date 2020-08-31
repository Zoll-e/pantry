import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function AddIngredient({ addItem }) {
  const [item, setItem] = useState({
    ingredient_name:"",
    portion:"",
  });
  return (
    <div>
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
            addItem(item);
            e.preventDefault();
          }}
        >
          kuld
        </button>
      </form>
      <h1></h1>
    </div>
  );
}

export default AddIngredient;
