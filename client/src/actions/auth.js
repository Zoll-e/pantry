import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_ERRORS,
  LOG_OUT,
  LOG_OUT_ERROR,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Register user

export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    header: {
      Authorization: {
        "Content-Type": "application/json",
      },
    },
  };

  const body = { name, email, password };

  try {
    const res = await axios.post("/api/user/register", body, config);

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      dispatch({type:GET_ERRORS,payload:errors});
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//Load user
export const loadUser = () => async dispatch => {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
  }
    try {
      const res = await axios.get("/api/user/me");

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {

      dispatch({
        type: USER_ERROR,
      });
    }
  
};

// Login user
export const login = ({ email, password }) => async dispatch => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const body = { email, password };
  try {
    const res = await axios.post("/api/user/login", body, config);

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      dispatch({type:GET_ERRORS,payload:errors});
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Log out user
export const logOut = () => async dispatch => {
  try {
    dispatch({
      type: LOG_OUT,
    });
  } catch (error) {
    dispatch({ type: LOG_OUT_ERROR });
  }
};

  
