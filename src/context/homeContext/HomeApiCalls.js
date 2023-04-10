import axios from "axios";
import {
  createHomeTextFailure,
  createHomeTextStart,
  createHomeTextSuccess,
  deleteHomeTextFailure,
  deleteHomeTextStart,
  deleteHomeTextSuccess,
  getHomeTextFailure,
  getHomeTextStart,
  getHomeTextSuccess,
  updateHomeTextStart,
  updateHomeTextSuccess,
  updateHomeTextFailure,
} from "./HomeActions";
import { baseUrl } from "../../baseUrl";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export const getHomeTextCall = async (id, dispatch) => {
  dispatch(getHomeTextStart());
  try {
    const res = await axiosInstance.get(`/landing/find/${id}`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getHomeTextSuccess(res.data));
  } catch (err) {
    dispatch(getHomeTextFailure());
  }
};

export const createHomeTextCall = async (homeText, dispatch) => {
  dispatch(createHomeTextStart());
  try {
    const res = await axiosInstance.post("/landing/", homeText, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createHomeTextSuccess(res.data));
  } catch (err) {
    dispatch(createHomeTextFailure());
  }
};

export const updateHomeTextCall = async (homeText, dispatch) => {
  dispatch(updateHomeTextStart());
  try {
    const res = await axiosInstance.put(`/landing/${homeText._id}`, homeText, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateHomeTextSuccess(res.data));
  } catch (err) {
    dispatch(updateHomeTextFailure());
  }
};

export const deleteHomeTextCall = async (id, dispatch) => {
  dispatch(deleteHomeTextStart());
  try {
    await axiosInstance.delete(`/landing/${id}`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteHomeTextSuccess());
  } catch (err) {
    dispatch(deleteHomeTextFailure());
  }
};