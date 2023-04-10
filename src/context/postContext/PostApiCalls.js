import axios from "axios";
import {
  createPostFailure,
  createPostStart,
  createPostSuccess,
  deletePostFailure,
  deletePostStart,
  deletePostSuccess,
  getPostsFailure,
  getPostsStart,
  getPostsSuccess,
  updatePostStart,
  updatePostSuccess,
  updatePostFailure,
} from "./PostActions";
import { baseUrl } from "../../baseUrl";


const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export const getPostsCall = async (dispatch) => {
  dispatch(getPostsStart());
  try {
    const res = await axiosInstance.get("/posts/", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getPostsSuccess(res.data));
  } catch (err) {
    dispatch(getPostsFailure());
  }
};

export const createPostCall = async (post, dispatch) => {
  dispatch(createPostStart());
  try {
    const res = await axiosInstance.post("/posts/", post, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createPostSuccess(res.data));
  } catch (err) {
    dispatch(createPostFailure());
  }
};

export const updatePostCall = async (post, dispatch) => {
  dispatch(updatePostStart());
  try {
    const res = await axiosInstance.put("/posts/" + post._id, post, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updatePostSuccess(res.data));
  } catch (err) {
    dispatch(updatePostFailure());
  }
};

export const deletePostCall = async (id, dispatch) => {
  dispatch(deletePostStart());
  try {
    await axiosInstance.delete("/posts/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deletePostSuccess(id));
  } catch (err) {
    dispatch(deletePostFailure());
  }
};