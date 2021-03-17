import React from 'react'
import "./styles.css"

const RecipeBottom = ({likeRecipe,likes,recipeId,stars}) => {
    return (
        <div
       className="recipe-bottom-container"
      >
        <div style={{ display: "flex", marginRight: "5%" }}>{stars}</div>

        <h4
          style={{
            marginRight: "5%",

            cursor: "pointer",
          }}
          onClick={e => likeRecipe(recipeId)}
        >
          Like {likes.length}
        </h4>
        <h4 style={{ cursor: "pointer", marginRight: "5%" }}>
          Leave a comment
        </h4>
      </div>
    )
}

export default RecipeBottom
