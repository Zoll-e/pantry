import axios from "axios";
import { GET_RECIPES, RECIPES_FAIL, RECIPE_ADDED } from "./types";

export const getRecipes = search => async dispatch => {
  try {
    let res = await axios.get("/api/recipe/");

    res.data = await res.data.filter(res =>
      res.dish.toLowerCase().includes(search.toLowerCase())
    );

    dispatch({ type: GET_RECIPES, payload: { data: res.data, search } });
  } catch (err) {
    dispatch({ type: RECIPES_FAIL });
  }
};

export const addRecipe = ({
  dish,
  description,
  intro,
  picture,
  ingredients,
}) => async dispatch => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const body = { dish, description, intro, picture, ingredients };

  console.log(body);
  try {
    const res = await axios.post("/api/recipe", body, config);
  } catch (error) {
    console.log(error);
  }
};
