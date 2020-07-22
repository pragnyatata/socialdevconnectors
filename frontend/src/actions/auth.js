import axios from "axios";
import * as types from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

//load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: types.USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: types.AUTH_ERROR,
    });
  }
};

//Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: types.REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((element) => {
        dispatch(setAlert(element.msg, "danger"));
      });
    }
    dispatch({
      type: types.REGISTER_FAIL,
    });
  }
};
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((element) => {
        dispatch(setAlert(element.msg, "danger"));
      });
    }
    dispatch({
      type: types.LOGIN_FAIL,
    });
  }
};
export const logout = () => (dispatch) => {
  dispatch({
    type: types.LOGOUT,
  });
  dispatch({
    type: types.CLEAR_PROFILE,
  });
};
