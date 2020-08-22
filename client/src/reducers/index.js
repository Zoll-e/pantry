import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import recipe from "./recipe";

export default combineReducers({
  auth,
  alert,
  recipe,
});
