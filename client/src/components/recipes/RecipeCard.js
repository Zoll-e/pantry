import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { likeRecipe } from "../../actions/recipe";

const RecipeCard = ({
  likeRecipe,
  auth: { isAuthenticated },
  recipe: { _id, dish, direction, intro,rating, likes, picture },
}) => {
  const history = useHistory();

  const routeChange = () => {
    let path = `/recipe/${_id}`;
    history.push(path);
  };

  return (
    <div
      className="recipeCard"
      onClick={e => routeChange()}
      style={{
        backgroundImage: `url(${picture})`,
        borderRadius: 5,
      }}
    >
      <p className={"dishName"}>{dish}</p>
      <div className="recipeCardOverlay"><p>{intro}</p></div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});
RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
  likeRecipe: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { likeRecipe })(RecipeCard);
