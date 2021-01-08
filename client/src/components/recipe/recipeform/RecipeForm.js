import React, { useState, Fragment } from "react";
import AddImage from "./AddImage";
import { addRecipe } from "../../../actions/recipe";
import { removeErrors } from "../../../actions/errors";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AddIngredient from "./AddIngredient";
import { Ingredient } from "./Ingredient";
import { upload } from "../../../actions/image";

const RecipeForm = ({ addRecipe, errors, removeErrors }) => {
  const [ingredientsArray, setIngredients] = useState([]);
  const [step, setStep] = useState(0);

  const [directionArray, setDirectionArray] = useState([]);
  const [direction, setDirection] = useState("");
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    dish: "",
    directions: "",
    intro: "",
    picture: "",
    ingredients: [],
  });

  let { dish, directions, intro, picture, ingredients } = formData;

  const onChange = async e => {
    Object.keys(errors).length > 0 && removeErrors();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    picture = await upload(image);
    ingredients = ingredientsArray;
    directions = directionArray;
    await addRecipe({ dish, directions, intro, picture, ingredients });
  };

  const addItem = passedIngredient => {
    setIngredients([...ingredientsArray, passedIngredient]);
  };
  const removeItem = id => {
    setIngredients(
      ingredientsArray.filter((ingredient, index) => index !== id)
    );
  };
  function renderSwitch(num) {
    switch (num) {
      case 0:
        return (
          <Fragment>
            <div>
              <input
                className="newRecipeDish"
                autoComplete="off"
                type="text"
                name="dish"
                spellCheck="false"
                autoCorrect="off"
                placeholder="Enter the name of your recipe"
                value={dish}
                size="20"
                maxLength="35"
                onChange={onChange}
              />
            </div>
            <button
            
              className="nextButton"
              disabled={dish.length < 1 ? true : false}
              onClick={() => setStep(step + 1)}
            >
              <span> Next</span>
            </button>
          </Fragment>
        );
      case 1:
        return (
          <Fragment>
            <AddImage
              setImage={setImage}
              image={image}
              errors={errors.picture}
            />

            <button
              className="previousButton"
              onClick={() => setStep(step - 1)}
            >
              <span>Back</span>
            </button>
            <button
              className="nextButton"
              disabled={!image ? true : false}
              onClick={() => setStep(step + 1)}
            >
              <span> Next</span>
            </button>
          </Fragment>
        );

      case 2:
        return (
          <Fragment>
            <div>
              <p className="newRecipeTitle">{`Write a short intro for your ${dish}`}</p>
              <textarea
                className="newRecipeIntro"
                type="text"
                maxLength="180"
                name="intro"
                spellCheck="false"
                value={intro}
                onChange={onChange}
              />
            </div>

            <button
              className="previousButton"
              onClick={() => setStep(step - 1)}
            >
              <span>Back</span>
            </button>
            <button
              className="nextButton"
              disabled={intro.length < 1 ? true : false}
              onClick={() => setStep(step + 1)}
            >
              <span> Next</span>
            </button>
          </Fragment>
        );
      case 3:
        return (
          <Fragment>
            <p className="newRecipeTitle">Add ingredients!</p>
            <div className="newRecipeIngredients">
              <AddIngredient addItem={addItem} />
            </div>
            <div className="ingredientArray">
              {ingredientsArray.map((ingredient, index) => (
                <Ingredient
                  key={index}
                  id={index}
                  ingredient={ingredient}
                  removeItem={removeItem}
                />
              ))}
            </div>
            <button
              className="previousButton"
              onClick={() => setStep(step - 1)}
            >
              <span>Back</span>
            </button>
            <button
              className="nextButton"
              disabled={ingredientsArray.length < 1 ? true : false}
              onClick={() => setStep(step + 1)}
            >
              <span> Next</span>
            </button>
          </Fragment>
        );

      case 4:
        return (
          <Fragment>
            <p className="newRecipeTitle">
              Write step-by-step directions for your{dish}
            </p>
            <p>Step {directionArray.length + 1}:</p>
            <div
              style={{
                display: "flex",
              }}
            >
              <div
              className="newRecipeDirectionArrowContainer"
                style={{
                
                  visibility: `${
                    directionArray.length > 0 ? "visible" : "hidden"
                  }`,

                }}
                onClick={e => {
                  directionArray.length > 0 &&
                    setDirection(directionArray[directionArray.length - 1]);
                  directionArray.splice(-1, 1);
                }}
              >
                <div className="newRecipeDirectionArrow leftArrow"></div>
              </div>
              <textarea
                className="newRecipeDirections"
                type="text"
                spellCheck="false"
                maxLength="700"
                name="direction"
                value={direction}
                onChange={e => setDirection(e.target.value)}
                errors={errors.direction}
              />

              <div
                className="newRecipeDirectionArrowContainer"
                style={{
                  visibility: `${direction === "" ? "hidden" : "visible"}`,
                  right: "1em"

                }}
                onClick={e => {
                  setDirectionArray([...directionArray, direction]);
                  setDirection("");
                }}
              >
                <div className="newRecipeDirectionArrow rightArrow"></div>
              </div>
            </div>
            <button
              className="previousButton"
              onClick={() => setStep(step - 1)}
            >
              <span>Back</span>
            </button>
            <button
              className="nextButton"
              disabled={directionArray.length < 1 ? true : false}
              type="submit"
              onClick={e => {
                direction !== "" && directionArray.push(direction);
                onSubmit(e);
              }}
            >
              <span> Finish</span>
            </button>
          </Fragment>
        );

      default:
        setStep(0);
    }
  }
  return <div className="newRecipeContainer">{renderSwitch(step)}</div>;
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
