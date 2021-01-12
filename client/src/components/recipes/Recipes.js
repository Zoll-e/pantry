import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getRecipes, likeRecipe,getUserRecipes } from "../../actions/recipe";
import { connect } from "react-redux";
import SearchRecipe from "./SearchRecipe";
import RecipeCard from "./RecipeCard";
import { Loading } from "../../utils/Loading";

const Recipes = ({ getRecipes,getUserRecipes,auth, recipe: { recipes, loading } }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
   auth.user && getUserRecipes(auth.user._id);
  }, [getUserRecipes, auth,search]);

  const onChange = async e => {
    setSearch(e.target.value);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="header">
          <div className="text-box">
            <h1 className="heading-primary">
              <span className="heading-primary-sub">
                search for any dish comes to your mind{" "}
              </span>
            </h1>
            <SearchRecipe search={search} onChange={onChange} />
          </div>
        </div>
      )}
      <div>
        <label htmlFor="myRecipes">My recipes</label>
        <input type="checkbox" value="myRecipes"></input>

        <label htmlFor="favorites">Favorites</label>
        <input type="checkbox" value="favorites"></input>

        <label htmlFor="vegan">Vegan </label>
        <input type="checkbox" value="vegan"></input>
        
      </div>
      <div className="recipeCardContainer">
        {recipes &&
          !loading &&
          recipes.map(recipe => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  recipe: state.recipe,
  auth: state.auth
});

Recipes.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
  getUserRecipes:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { likeRecipe,getUserRecipes, getRecipes })(Recipes);
