import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getRecipes, likeRecipe, getUserRecipes } from "../../actions/recipe";
import { connect } from "react-redux";
import SearchRecipe from "./SearchRecipe";
import RecipeCard from "./RecipeCard";
import { Loading } from "../../utils/Loading";
import "./styles.css"

const Recipes = ({ getRecipes,auth,getUserRecipes, recipe: { recipes, loading } }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    getRecipes(search);
    //auth && getUserRecipes(auth._id,);
  }, [getRecipes,search]);

  const onChange = async e => {
    setSearch(e.target.value);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
       
            <SearchRecipe search={search} onChange={onChange} />
        </div>
      )}
    
      <div className="recipe-card-container">
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
  auth:state.auth.user
  
});

Recipes.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
  getUserRecipes:PropTypes.func.isRequired,
  
  
};

export default connect(mapStateToProps, { likeRecipe,getUserRecipes, getRecipes })(Recipes);
