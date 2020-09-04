import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { getRecipe } from "../../actions/recipe";
import { connect } from "react-redux";
import Picture from "../recipes/Picture";

const RecipeShow = ({ recipe: { loading, recipe }, getRecipe, match }) => {
  useEffect(() => {
    getRecipe(match.params.id);
  }, [getRecipe, match.params.id]);

  const pictureStyles = {maxHeight:"500px",width:"100%"};
  return (
    <div>
      {recipe && (
        <Fragment>
          
            <Picture
              src={`/api/photos/${recipe.picture}`}
              styles={pictureStyles}
            />
          

          <div>
            <h1>{recipe.dish}</h1>
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
