import axios from "axios";
import { setAlert } from "./alert";
import * as types from "./types";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: types.GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const getProfiles = () => async (dispatch) => {
  dispatch({
    type: types.CLEAR_PROFILE,
  });
  try {
    const res = await axios.get("/api/profile");
    dispatch({
      type: types.GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: types.GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type: types.GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const res = await axios.post("/api/profile/", formData);

    dispatch({
      type: types.GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));
    if (!edit) history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((element) => {
        dispatch(setAlert(element.msg, "danger"));
      });
    }
    dispatch({
      type: types.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.put("/api/profile/experience", formData);

    dispatch({
      type: types.UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience Added", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((element) => {
        dispatch(setAlert(element.msg, "danger"));
      });
    }
    dispatch({
      type: types.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.put("/api/profile/education", formData);

    dispatch({
      type: types.UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education Added", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((element) => {
        dispatch(setAlert(element.msg, "danger"));
      });
    }
    dispatch({
      type: types.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: types.UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience deleted", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((element) => {
        dispatch(setAlert(element.msg, "danger"));
      });
    }
    dispatch({
      type: types.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: types.UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education deleted", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((element) => {
        dispatch(setAlert(element.msg, "danger"));
      });
    }
    dispatch({
      type: types.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This cannot be undone")) {
    try {
      await axios.delete(`/api/profile`);

      dispatch({
        type: types.CLEAR_PROFILE,
      });
      dispatch({
        type: types.ACCOUNT_DELETED,
      });
      dispatch(
        setAlert("Your Account has been permenantly deleted", "success")
      );
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((element) => {
          dispatch(setAlert(element.msg, "danger"));
        });
      }
      dispatch({
        type: types.PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
