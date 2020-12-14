import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { getRecipe } from "../../actions/recipe";
import { connect } from "react-redux";
import NotFound from "../../utils/NotFound";
import { Loading } from "../../utils/Loading";

const RecipeShow = ({ recipe: {  loading,recipe }, getRecipe, match }) => {
  useEffect(() => {
    getRecipe(match.params.id);
  }, [getRecipe, match.params.id]);

  const pictureStyles = { height: "800px" };
  return (
    <div>
      {loading ? <Loading /> : recipe ? (
        <Fragment>
          <div >
            <div
            style={{margin:"auto",marginTop:"3rem",backgroundSize:"cover",backgroundImage:`URL(/${recipe.picture})`,height:"55rem",width:"85vw"}}
              classes="col-12 row"
            />
            <div>
              <h1>{recipe.dish}</h1>
              <h4>{recipe.intro}</h4>
              <h4>Ingredients</h4>
              {recipe.ingredients.map(ingredient => (
                <h5>{ingredient.ingredient_name}</h5>
              ))}
              <h4>{recipe.description}</h4>
              <h5>Rate it if you like it</h5>
              <h5>Like recipe</h5>
              <h5>Leave a comment</h5>
            </div>
          </div>
        </Fragment>
      ):(<NotFound />)}
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
