import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
  LOG_OUT_ERROR,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("jwtToken"),
  isAuthenticated: false,
  loading: true,
  user: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("jwtToken", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
      localStorage.removeItem("jwtToken");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("jwtToken", payload.token);
      return {
        ...state,
        ...payload,
        loading: false,
        isAuthenticated: true,
      };
    case LOGIN_FAIL:
      localStorage.removeItem("jwtToken");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case AUTH_ERROR:
      localStorage.removeItem("jwtToken");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null,
      };
    case LOG_OUT:
      localStorage.removeItem("jwtToken");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null,
      };
      case LOG_OUT_ERROR:
        return state;
    default:
      return state;
  }
}
