import { RECIPES_FAIL, GET_RECIPES } from "../actions/types";

const initialState = {
  loading: true,
  recipe:null,
  search:"",
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_RECIPES:
      return {
        ...state,
        recipe: payload.data,
        loading: false,
        search: payload.search,
      };
    
    case RECIPES_FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
