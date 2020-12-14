import { combineReducers } from "redux";
import auth from "./auth";
import recipe from "./recipe";
import image from "./image";
import errors from "./errors";

export default combineReducers({
  auth,
  errors,
  recipe,
  image,
});
