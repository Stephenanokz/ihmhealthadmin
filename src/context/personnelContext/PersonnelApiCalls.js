import axios from "axios";
import {
  createPersonnelFailure,
  createPersonnelStart,
  createPersonnelSuccess,
  deletePersonnelFailure,
  deletePersonnelStart,
  deletePersonnelSuccess,
  getPersonnelsFailure,
  getPersonnelsStart,
  getPersonnelsSuccess,
  updatePersonnelStart,
  updatePersonnelSuccess,
  updatePersonnelFailure,
} from "./PersonnelActions";
import { baseUrl } from "../../baseUrl";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export const getPersonnelsCall = async (dispatch) => {
  dispatch(getPersonnelsStart());
  try {
    const res = await axiosInstance.get("/personnels/", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getPersonnelsSuccess(res.data));
  } catch (err) {
    dispatch(getPersonnelsFailure());
  }
};

export const createPersonnelCall = async (personnel, dispatch) => {
  dispatch(createPersonnelStart());
  try {
    const res = await axiosInstance.post("/personnels/", personnel, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createPersonnelSuccess(res.data));
  } catch (err) {
    dispatch(createPersonnelFailure());
  }
};

export const updatePersonnelCall = async (personnel, dispatch) => {
  dispatch(updatePersonnelStart());
  try {
    const res = await axiosInstance.put(`/personnels/${personnel._id}`, personnel, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updatePersonnelSuccess(res.data));
  } catch (err) {
    dispatch(updatePersonnelFailure());
  }
};

export const deletePersonnelCall = async (id, dispatch) => {
  dispatch(deletePersonnelStart());
  try {
    await axiosInstance.delete(`/personnels/${id}`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deletePersonnelSuccess(id));
  } catch (err) {
    dispatch(deletePersonnelFailure());
  }
};