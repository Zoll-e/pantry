import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getRecipe, likeRecipe, rateRecipe } from "../../../actions/recipe";
import { connect } from "react-redux";

import { Loading } from "../../../utils/Loading";
import Star from "./Star";
import RecipeTop from "./RecipeTop";
import RecipeMiddle from "./RecipeMiddle";
import RecipeBottom from "./RecipeBottom";

const RecipeShow = ({
  getRecipe,
  recipe: { loading, recipe },
  likeRecipe,
  match,
  user,
  rateRecipe,
}) => {
  useEffect(() => {
    getRecipe(match.params.id);
  }, [getRecipe, match.params.id]);

  var stars = [];

  const [rate, setRate] = useState(-1);

  if (recipe && user) {
    var recipeRating = recipe.rating.reduce(
      (sum, rating) => sum + rating.rate,
      0
    );

    var userRating = 0;
    recipe.rating.map(e => e.user === user._id && (userRating = e.rate));

    for (let i = 1; i < 6; i++) {
      stars.push(
        <Star
          key={i}
          recipeId={recipe._id}
          isFilled={
            rate === -1
              ? userRating >= i
                ? true
                : false
              : rate >= i
              ? true
              : false
          }
          index={i}
          rateRecipe={rateRecipe}
          setRate={setRate}
        />
      );
    }
  }
  return (
    <div>
      {!recipe ? (
        <Loading />
      ) : (
          <div className="recipe-show-container" >
            <RecipeTop
              intro={recipe.intro}
              user={recipe.user}
              picture={recipe.picture}
              dish={recipe.dish}
              vegan={recipe.vegan}

            />
            <RecipeMiddle
              ingredients={recipe.ingredients}
              directions={recipe.directions}
              
            />

            {user && <RecipeBottom
              likeRecipe={likeRecipe}
              likes={recipe.likes}
              recipeId={recipe._id}
              stars={stars}
            />}
          </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  recipe: state.recipe,
  user: state.auth.user,
});
RecipeShow.propTypes = {
  getRecipe: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
  user : PropTypes.object,
  likeRecipe: PropTypes.func.isRequired,
  rateRecipe: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { likeRecipe, rateRecipe, getRecipe })(
  RecipeShow
);
