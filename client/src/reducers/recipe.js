import { RECIPES_FAIL, GET_RECIPE,RECIPE_ADDED } from "../actions/types";

const initialState = {
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_RECIPE:
      return {
        ...state,
        recipe: payload,
        loading: false,
      };

      case RECIPE_ADDED:
          return{
              ...state,
              recipe: payload,
              loading: false,
          }
    case RECIPES_FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
