import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { getRecipes ,likeRecipe} from "../../actions/recipe";
import { connect } from "react-redux";
import SearchRecipe from "./SearchRecipe";
import RecipeCard from "./RecipeCard";
import { Loading } from "../../utils/Loading";
import ViewRecipe from "../recipe/ViewRecipe";

const Recipes = ({ getRecipes,recipe: { recipes, loading } }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    getRecipes(search);
  },[getRecipes,search]);

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

      <div
        style={{
          display: "flex",
          flexWrap:"wrap",
          justifyContent:"center",
        }}
      >
        {recipes &&
          !loading &&
          recipes.map(recipe => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
          <i aria-hidden="true" style={{width:"45%",height:"200px",margin:"2%"}}></i>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  recipe: state.recipe,
});

Recipes.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
};


export default connect(mapStateToProps, { likeRecipe,getRecipes })(Recipes);
