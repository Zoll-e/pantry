import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { likeRecipe } from "../../actions/recipe";
import ViewRecipe from "../recipe/ViewRecipe";

const RecipeCard = ({
  likeRecipe,
  auth: { isAuthenticated },
  recipe: { _id, dish, description, rating, likes, picture },
}) => {
  const [view, setView] = useState(false);
  const history = useHistory();

  const routeChange = () => {
    let path = `/recipe/${_id}`;
    history.push(path);
  };

  return (
    <div
      style={{
        backgroundColor: "whitesmoke",
        border: ".5px solid grey",
        width: "45%",
        height: "200px",
        margin: "2%",
        borderLeft: "none",
        borderRight: "none",
      }}
    >
      {view && <ViewRecipe  picture={picture} setView={setView}/> }

      <div
        style={{
          display: "inline-block",
          height: "100%",
          position: "relative",
          float: "left",
          width: "40%",
          marginRight: "1rem",
          backgroundImage: `url(${picture})`,
          backgroundSize: "cover",
        }}
      ></div>
      <div
        style={{
          height: "200px",
          width: "50%",
          display: "inline-block",
        }}
      >
        <div style={{ margin: ".8rem" }}>
          <h3
            onClick={e=>routeChange()}
            style={{
              background: "none",
              border: "none",
              padding: "0",
              color: "#069",
              cursor: "pointer",
            }}
          >
            {dish}
          </h3>
          <p
            className="recipeDescription"
            style={{
              overflow: "hidden",

              height: "88px",
              wordBreak: "break-word",
              position: "relative",
            }}
          >
            {description}
          </p>
          <div>
            {" "}
            <h5 style={{ float: "left" }} onClick={e => likeRecipe(_id)}>
              {likes.length > 0 ? likes.length : ""}{" "}
              {isAuthenticated ? "Like" : ""}
            </h5>
            <h5 style={{ float: "right" }}> Rating {rating}</h5>
          </div>
        </div>
      </div>
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
