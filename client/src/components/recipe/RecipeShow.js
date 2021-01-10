import React, { useEffect, Fragment,useRef,useState } from "react";
import PropTypes from "prop-types";
import { getRecipe } from "../../actions/recipe";
import { connect } from "react-redux";
import NotFound from "../../utils/NotFound";
import { Loading } from "../../utils/Loading";

const RecipeShow = ({ recipe: { loading, recipe }, getRecipe, match }) => {
  const [height, setHeight] = useState(0)
  


  useEffect(() => {
    getRecipe(match.params.id);

  }, [getRecipe, match.params.id]);

  
  useEffect(() => {
    
    const updateWindowDimensions = () => {
       setHeight(ref.current.clientHeight);
      
    };

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions) 

  }, []);

  useEffect(()=> {
    recipe && setHeight(ref.current.clientHeight)
  })

 
  const ref = useRef(null)
  

  return (
    <div>
      {loading ? (
        <Loading />
      ) : recipe ? (
        <Fragment>
          <div
            style={{
              width: "95%",

              height: "fit-content",

              marginBottom: "3%",

              padding: "2%",
              background: "whitesmoke",
              backgroundImage: "radial-gradient(#bfc0c1 7.2%, transparent 0)",
              backgroundSize: "25px 25px",
              margin: "auto",

              marginTop: "3%",
              borderRadius: " 10px",
              boxShadow: "4px 3px 7px 2px #00000040",
            }}
          >
            <h1 className="recipeShowTitle">{recipe.dish}</h1>
            <div style={{marginLeft:"5%",marginBottom:"15%",display:"flex"}}>
              <div
              ref={ref}
                style={{
                  
                  backgroundSize: "cover",
                  backgroundImage: `URL(/${recipe.picture})`,
                  
                  paddingTop: "28.125%",
                  maxHeight:"40vh",
                  position:"relative",
                  width: "50%",
                  zIndex: "1",
                  backgroundPosition: "center",
                  borderRadius: "5px",
                }}
              > </div>

              <div 
                style={{
                  
                  width: "50%",
                  transform:"translateX(-10%) translateY(40%) ",
                  
                  padding:"7%",
                  
                  
                  backgroundColor: "rgba(253, 203, 110, 0.4)",
                  borderRadius: "5px",
                  height:`${height}px`,
                  fontSize:"1.4vw",
                  
                }}
              >
                <p>{recipe.intro} {height}</p>
              </div>
            </div>
            <div>
              <h4>Ingredients</h4>
              {recipe.ingredients.map(e => (
                <h4>
                  {e.quantity}-{e.unit}-{e.name}
                </h4>
              ))}
              {recipe.directions.map((e, index) => (
                <h4>
                  {index + 1} - {e}
                </h4>
              ))}
              <h5>Rate it if you like it</h5>
              <h5>Like recipe</h5>
              <h5>Leave a comment</h5>
            </div>
          </div>
        </Fragment>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  recipe: state.recipe,
});
RecipeShow.propTypes = {
  getRecipe: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getRecipe })(RecipeShow);
