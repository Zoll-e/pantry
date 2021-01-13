import React, { useEffect, Fragment, useRef, useState } from "react";
import PropTypes from "prop-types";
import { getRecipe, likeRecipe, rateRecipe } from "../../../actions/recipe";
import { connect } from "react-redux";

import { Loading } from "../../../utils/Loading";
import Star from "./Star";

const RecipeShow = ({
  getRecipe,
  recipe: { loading, recipe },
  likeRecipe,
  match,
  auth,
  rateRecipe,
}) => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    getRecipe(match.params.id);
  }, [getRecipe, match.params.id]);

  useEffect(() => {
    const updateWindowDimensions = () => {
      recipe && setHeight(ref.current.clientHeight);
    };

    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, [recipe]);

  const ref = useRef(null);

  var stars = [];

  const [rate, setRate] = useState(-1);

  if (recipe && auth.user) {

    var recipeRating = recipe.rating.reduce((sum, rating) => sum + rating.rate, 0);

    var userRating = 0;
    recipe.rating.map(e => e.user === auth.user._id && (userRating = e.rate));
console.log(Math.round(recipeRating/recipe.rating.length));

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
        <Fragment>
          <div
            style={{
              width: "95%",

              height: "fit-content",

              padding: "2%",
              background: "whitesmoke",
              backgroundImage: "radial-gradient(#bfc0c1 7.2%, transparent 0)",
              backgroundSize: "25px 25px",
              margin: "3%",

              borderRadius: " 10px",
              boxShadow: "4px 3px 7px 2px #00000040",
            }}
          >
            <h1 className="recipeShowTitle">{recipe.dish}</h1>
            <div
              style={{ marginLeft: "5%", marginBottom: "15%", display: "flex" }}
            >
              <div
                ref={ref}
                style={{
                  backgroundSize: "cover",
                  backgroundImage: `URL(/${recipe.picture})`,

                  paddingTop: "28.125%",
                  maxHeight: "40vh",
                  position: "relative",
                  width: "50%",
                  zIndex: "1",
                  backgroundPosition: "center",
                  borderRadius: "5px",
                }}
              >
                {" "}
              </div>

              <div
                style={{
                  width: "50%",
                  transform: "translateX(-10%) translateY(25%) ",

                  padding: "7%",

                  backgroundColor: "rgba(253, 203, 110, 0.4)",
                  borderRadius: "5px",
                  height: `${height}px`,
                  fontSize: "1.4vw",
                }}
              >
                <p>
                  {recipe.intro} {height}
                </p>
              </div>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ width: "50%", marginRight: "5%" }}>
                <h4>Ingredients</h4>
                {recipe.ingredients.map((e, i) => (
                  <p key={i}>
                    {e.quantity}-{e.unit}-{e.name}
                  </p>
                ))}
              </div>
              <div>
                <h4>Directions</h4>
                {recipe.directions.map((e, index) => (
                  <p key={index}>
                    {index + 1} - {e}
                  </p>
                ))}
              </div>
            </div>
            <div
              style={{
                marginTop: "5%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h5>Rate</h5>
              <div style={{ display: "flex", marginRight: "5%" }}>{stars}</div>

              <h5 style={{ marginRight: "5%" }}>Add to favorites</h5>

              <h5
                style={{
                  marginRight: "5%",
                  border: "5px solid red",

                  cursor: "pointer",
                }}
                onClick={e => likeRecipe(recipe._id)}
              >
                Like {recipe.likes.length}
              </h5>
              <h5 style={{ marginRight: "5%" }}>Leave a comment</h5>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  recipe: state.recipe,
  auth: state.auth,
});
RecipeShow.propTypes = {
  getRecipe: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  likeRecipe: PropTypes.func.isRequired,
  rateRecipe: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { likeRecipe, rateRecipe, getRecipe })(
  RecipeShow
);
