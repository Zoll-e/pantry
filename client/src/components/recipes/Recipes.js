import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { getRecipes } from "../../actions/recipe";
import { connect } from "react-redux";
import SearchRecipe from "./SearchRecipe";
import RecipeCard from "./RecipeCard";

const Recipes = ({ recipes: { recipes, loading } }) => {
  return (
    <Fragment>
      <div className="header">
        <div className="text-box">
          <h1 className="heading-primary">
            <span className="heading-primary-main"> pantry</span>
            <span className="heading-primary-sub"> search for any dish comes to your mind </span>
          </h1> 
        <SearchRecipe />
        </div>
        </div>
        <div className="">
          {recipes &&
            !loading &&
            recipes.map(recipe => <RecipeCard key={recipe._id} recipe={recipe} />)}
        </div>
    </Fragment>
  );
};

Recipes.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  recipes: state.recipes,
});

export default connect(mapStateToProps, { getRecipes })(Recipes);
