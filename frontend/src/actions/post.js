import axios from "axios";
import { setAlert } from "./alert";
import * as types from "./types";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: types.GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: types.GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);
    dispatch({
      type: types.UPDATE_LIKES,
      payload: { id: postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: types.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);
    dispatch({
      type: types.UPDATE_LIKES,
      payload: { id: postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: types.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const deletePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${postId}`);
    dispatch({
      type: types.DELETE_POST,
      payload: { id: postId },
    });
    dispatch(setAlert("Post Removed", "success"));
  } catch (err) {
    dispatch({
      type: types.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/api/posts`, formData, config);
    dispatch({
      type: types.ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    dispatch({
      type: types.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );
    dispatch({
      type: types.ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: types.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: types.REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: types.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
