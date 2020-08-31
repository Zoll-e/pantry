import React, { Fragment,useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRecipes } from "../../actions/recipe";


const SearchRecipe = ({getRecipes, recipe: { recipe, loading } }) => {
  
    const [search, setSearch] = useState("");

    useEffect(()=>{
        getRecipes(search);
    },[getRecipes,search]);


  const onChange = async e => {
    setSearch(e.target.value);
  };

  return (
    <Fragment>
      <input 
      className="header-primary-input"
        type="text"
        size="90"
        autoComplete="off"
        name="search"
        value={search}
        placeholder="Search by dish name"
        onChange={e => onChange(e)}
      />
      
    </Fragment>
  );
};

SearchRecipe.propTypes = {
  recipe: PropTypes.object.isRequired,
  
};
const mapStateToProps = state => ({
  recipe: state.recipe,
});

export default connect(mapStateToProps,{getRecipes})(SearchRecipe);
