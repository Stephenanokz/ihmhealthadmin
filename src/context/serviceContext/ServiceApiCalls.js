import axios from "axios";
import {
  createServiceFailure,
  createServiceStart,
  createServiceSuccess,
  deleteServiceFailure,
  deleteServiceStart,
  deleteServiceSuccess,
  getServicesFailure,
  getServicesStart,
  getServicesSuccess,
  updateServiceStart,
  updateServiceSuccess,
  updateServiceFailure,
} from "./ServiceActions";
import { baseUrl } from "../../baseUrl";


const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export const getServicesCall = async (dispatch) => {
  dispatch(getServicesStart());
  try {
    const res = await axiosInstance.get("/services/", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getServicesSuccess(res.data));
  } catch (err) {
    dispatch(getServicesFailure());
  }
};

export const createServiceCall = async (service, dispatch) => {
  dispatch(createServiceStart());
  try {
    const res = await axiosInstance.post("/services/", service, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createServiceSuccess(res.data));
  } catch (err) {
    dispatch(createServiceFailure());
  }
};

export const updateServiceCall = async (service, dispatch) => {
  dispatch(updateServiceStart());
  try {
    const res = await axiosInstance.put(`/services/${service._id}`, service, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateServiceSuccess(res.data));
  } catch (err) {
    dispatch(updateServiceFailure());
  }
};

export const deleteServiceCall = async (id, dispatch) => {
  dispatch(deleteServiceStart());
  try {
    await axiosInstance.delete(`/services/${id}`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteServiceSuccess(id));
  } catch (err) {
    dispatch(deleteServiceFailure());
  }
};