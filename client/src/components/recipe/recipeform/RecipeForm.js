import React, { useState, Fragment } from "react";
import AddImage from "./AddImage";
import { addRecipe } from "../../../actions/recipe";
import {removeErrors} from "../../../actions/errors";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AddIngredient from "./AddIngredient";
import { Ingredient } from "./Ingredient";
import Fakeinput from "../../../utils/Fakeinput";

const RecipeForm = ({ addRecipe,errors,removeErrors, image: { loading, route } }) => {
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
    Object.keys(errors).length > 0 && removeErrors(); 

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    ingredients = ingredientsArray;
    picture = route;
    addRecipe({ dish, description, intro, picture, ingredients });
  };

  const addItem = passedIngredient => {
      setIngredients([...ingredientsArray, passedIngredient]);
    
  };
  const removeItem = id => {
    setIngredients(
      ingredientsArray.filter((ingredient, index) => index !== id)
    );
  };

  return (
    <Fragment>
      <div className="container rounded border">
      <AddImage errors={errors.picture} />
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
        <div className="col-4 offset-1">
          <Fakeinput
            type="text"
            name="dish"
            placeholder="Enter the name of your recipe"
            value={dish}
            onChange={onChange}
            errors={errors.dish}
          />
        </div>
        <div className="col-4 offset-1">
          <Fakeinput
            type="text"
            name="description"
            placeholder="Enter description"
            value={description}
            onChange={onChange}
            errors={errors.description}
          />
        </div>
        <div className="col-4 offset-1">
          <Fakeinput
            type="text"
            name="intro"
            placeholder="Enter an intro to your recipe"
            value={intro}
            onChange={onChange}
            errors={errors.intro}
          />
        </div>
        <button className="btn btn-primary">Done</button>
      </form>
      </div>
    </Fragment>
  );
};

RecipeForm.propTypes = {
  removeErrors: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  image: state.image,
  errors:state.errors,
});
export default connect(mapStateToProps, { addRecipe,removeErrors })(RecipeForm);