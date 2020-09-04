import axios from "axios";
import { GET_RECIPES, RECIPES_FAIL, RECIPE_ADDED,GET_RECIPE } from "./types";

export const getRecipe = id => async dispatch => {
  try {
    console.log(id);
    let res = await axios.get(`/api/recipe/${id}`);
    console.log(res.data);

    dispatch({ type: GET_RECIPE, payload: res.data });
  } catch (error) {
    dispatch({type:RECIPES_FAIL});
  }
};
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
    dispatch({type: RECIPE_ADDED,payload:res.data});
  } catch (error) {
    dispatch({type:RECIPES_FAIL})
  }
};
