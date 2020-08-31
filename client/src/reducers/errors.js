import { GET_ERRORS, REMOVE_ERRORS } from "../actions/types";
const initialState = {
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ERRORS:
      return action.payload;
    case REMOVE_ERRORS:
      
      return {};
    default:
      return state;
  }
}
