import {
  RECIPES_FAIL,
  GET_RECIPES,
  GET_RECIPE,
  UPDATE_LIKES,
  RECIPE_ADDED,
  RATINGS_UPDATED
} from "../actions/types";

const initialState = {
  loading: true,
  recipes: [],
  recipe: null,
  search: "",
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
        recipe: payload,
        loading: false,
      };

    case RECIPES_FAIL:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        recipe: { ...state.recipe, likes:payload },
        loading: false,
      };

      case RATINGS_UPDATED:
        return{
          ...state,
          recipe: {...state.recipe,rating:payload},
          loading:false,
        }
    case RECIPE_ADDED:
      return {
        ...state,
        recipe: payload,
        loading: false,
      };

    default:
      return state;
  }
}
