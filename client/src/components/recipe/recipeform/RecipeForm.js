import React, { useState, Fragment } from "react";
import AddImage from "./AddImage";
import { useHistory } from "react-router-dom";

import { addRecipe } from "../../../actions/recipe";
import { removeErrors } from "../../../actions/errors";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AddIngredient from "./AddIngredient";
import { Ingredient } from "./Ingredient";
import FakeInput from "../../../utils/Fakeinput";
import { upload } from "../../../actions/image";

const RecipeForm = ({ addRecipe, errors, removeErrors }) => {
  const [ingredientsArray, setIngredients] = useState([]);




  const [image, setImage] = useState(null);
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
    picture = await upload(image);
    ingredients = ingredientsArray;
    await addRecipe({ dish, description, intro,picture, ingredients });
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
        <AddImage setImage={setImage} image={image} errors={errors.picture} />
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
            <FakeInput
              type="text"
              name="dish"
              placeholder="Enter the name of your recipe"
              value={dish}
              onChange={onChange}
              errors={errors.dish}
            />
          </div>
          <div className="col-4 offset-1">
            <FakeInput
              type="text"
              name="description"
              placeholder="Enter description"
              value={description}
              onChange={onChange}
              errors={errors.description}
            />
          </div>
          <div className="col-4 offset-1">
            <FakeInput
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
  errors: state.errors,
});
export default connect(mapStateToProps, { addRecipe, removeErrors })(
  RecipeForm
);
