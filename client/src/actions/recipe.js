import axios from "axios";
import {
  GET_RECIPES,
  RECIPES_FAIL,
  RECIPE_ADDED,
  GET_RECIPE,
  GET_ERRORS,
  UPDATE_LIKES,
} from "./types";

export const getRecipe = id => async dispatch => {
  try {
    let res = await axios.get(`/api/recipe/${id}`);

    dispatch({ type: GET_RECIPE, payload: res.data });
  } catch (error) {
    dispatch({ type: RECIPES_FAIL });
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
export const getUserRecipes = userId => async dispatch => {
  try {
    let res = await axios.get(`/api/recipe/userrecipes/${userId}`);

    dispatch({ type: GET_RECIPES, payload: { data: res.data } });
  } catch (err) {
    dispatch({ type: RECIPES_FAIL });
  }
};
export const likeRecipe = recipeid => async dispatch => {
  try {
    const res = await axios.put(`/api/recipe/like/${recipeid}`);
    dispatch({
      type: UPDATE_LIKES,
      payload:   res.data ,
    });
  } catch (error) {
    dispatch({ type: RECIPES_FAIL });
  }
};

export const addRecipe = ({
  dish,
  directions,
  intro,
  picture,
  ingredients,
}) => async dispatch => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const body = { dish, directions, intro, picture, ingredients };
  try {
    const res = await axios.post("/api/recipe", body, config);
    dispatch({ type: RECIPE_ADDED, payload: res.data });
    window.location = `/recipe/${res.data._id}`;
  } catch (err) {
    console.log(err.response.data.errors);
    const errors = err.response.data.errors;
    if (errors) {
      dispatch({ type: GET_ERRORS, payload: errors });
    }
    dispatch({ type: RECIPES_FAIL });
  }
};
