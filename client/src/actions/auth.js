import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
  LOG_OUT_ERROR,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "../actions/alert";

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
      errors.forEach(error => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const loadUser = () => async dispatch => {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);

    try {
      const res = await axios.get("/api/user/me");

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
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
      errors.forEach(error => dispatch(setAlert(error.msg, "error")));
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
