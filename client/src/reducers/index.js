import { combineReducers } from "redux";
import auth from "./auth";
import recipes from "./recipes";
import recipe from "./recipe";
import image from "./image";
import errors from "./errors";

export default combineReducers({
  auth,
  errors,
  recipe,
  recipes,
  image,
});
