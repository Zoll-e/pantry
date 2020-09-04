import { RECIPES_FAIL, GET_RECIPES,GET_RECIPE } from "../actions/types";

const initialState = {
  loading: true,
  recipes:null,
  search:"",
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: payload.data,
        loading: false,
        search: payload.search,
      };
      case GET_RECIPE:
      return {
        ...state,
        recipes: payload.data,
        loading: false,
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
