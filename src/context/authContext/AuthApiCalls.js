import axios from "axios";
import { loginFailure, loginStart, loginSuccess, logout } from "./AuthActions";
import { baseUrl } from "../../baseUrl";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export const loginCall = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axiosInstance.post("auth/login", user);
    res.data.isAdmin && dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logoutCall = async (dispatch) => {
  try {
    dispatch(logout());
  } catch (err) {
    console.log(err);
  }
};
