import { REMOVE_ERRORS } from "./types";
// Remove errors
export const removeErrors = () => dispatch => {
  dispatch({ type: REMOVE_ERRORS });
};
