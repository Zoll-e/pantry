import React, { Fragment,useState,useEffect } from "react";
import PropTypes from "prop-types";
import { getRecipes } from "../../actions/recipe";
import { connect } from "react-redux";
import SearchRecipe from "./SearchRecipe";
import RecipeCard from "./RecipeCard";
import { Loading } from "../../utils/Loading";

const Recipes = ({ recipes: { recipes, loading },getRecipes }) => {

  const [search, setSearch] = useState("");

  useEffect(()=>{
      getRecipes(search);
  },[getRecipes,search]);

  const onChange = async e => {
    setSearch(e.target.value);
  };

  return (
    <Fragment>
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

      <div className="row container">
        {recipes &&
          !loading &&
          recipes.map(recipe => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
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
