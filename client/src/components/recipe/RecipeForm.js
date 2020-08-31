import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import AddImage from "./AddImage";
import { addRecipe } from "../../actions/recipe";
import { connect } from "react-redux";
import AddIngredient from "./AddIngredient";
import { Ingredient } from "./Ingredient";

const RecipeForm = ({ addRecipe, image: { loading, photoId } }) => {
  const [ingredientsArray, setIngredients] = useState([]);
  const [formData, setFormData] = useState({
    dish: "",
    description: "",
    intro: "",
    picture: "",
    ingredients: [],
  });

  let { dish, description, intro, picture, ingredients } = formData;

  const onChange = async e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    picture = photoId;
    console.log(photoId);
    console.log(picture);
    ingredients = ingredientsArray;
    addRecipe({ dish, description, intro, picture, ingredients });
  };

  const addItem = passedIngredient => {
    if (passedIngredient.length > 0) {
      setIngredients([...ingredientsArray, passedIngredient]);
    }
  };
  const removeItem = id => {
    setIngredients(
      ingredientsArray.filter((ingredient, index) => index !== id)
    );
  };

  return (
    <Fragment>
      <AddImage />
      <AddIngredient addItem={addItem} />
      {ingredientsArray.map((ingredient, index) => (
        <Ingredient
          key={index}
          id={index}
          ingredient={ingredient}
          removeItem={removeItem}
        />
      ))}
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            name="dish"
            placeholder="Enter the name of your recipe"
            value={dish}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="description"
            placeholder="Enter description"
            value={description}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="intro"
            placeholder="Enter an intro to your recipe"
            value={intro}
            onChange={onChange}
          />
        </div>
        <button>Button</button>
      </form>
    </Fragment>
  );
};

RecipeForm.propTypes = {};

const mapStateToProps = state => ({
  image: state.image,
});
export default connect(mapStateToProps, { addRecipe })(RecipeForm);
