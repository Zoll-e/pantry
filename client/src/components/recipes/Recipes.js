import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { getRecipes } from "../../actions/recipe";
import { connect } from "react-redux";
import SearchRecipe from "./SearchRecipe";
import RecipeCard from "./RecipeCard";

const Recipes = ({ recipe: { recipe, loading } }) => {
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
        <main>
        <section className="cards">
          {recipe &&
            !loading &&
            recipe.map(recipe => <RecipeCard key={recipe._id} recipe={recipe} />)}
        </section>
        </main>
    </Fragment>
  );
};

Recipes.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  recipe: state.recipe,
});

export default connect(mapStateToProps, { getRecipes })(Recipes);
