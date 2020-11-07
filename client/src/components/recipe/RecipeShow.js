import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { getRecipe } from "../../actions/recipe";
import { connect } from "react-redux";
import Picture from "../recipes/Picture";

const RecipeShow = ({ recipe: { loading, recipe }, getRecipe, match }) => {
  useEffect(() => {
    getRecipe(match.params.id);
  }, [getRecipe, match.params.id]);

  const pictureStyles = { height: "800px" };
  return (
    <div>
      {recipe && (
        <Fragment>
          <div className="container">
            <Picture
              src={`/${recipe.picture}`}
              styles={pictureStyles}
              classes="col-12 row"
            />
            <div>
              <h1>{recipe.dish}</h1>
              <h4>{recipe.intro}</h4>
              <h4>Ingredients</h4>
              {recipe.ingredients.map(ingredient => (
                <h5>{ingredient}</h5>
              ))}
              <h4>{recipe.description}</h4>
              <h5>Rate it if you like it</h5>
              <h5>Like recipe</h5>
              <h5>Leave a comment</h5>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  recipe: state.recipe,
});
RecipeShow.propTypes = {
  getRecipe: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getRecipe })(RecipeShow);
