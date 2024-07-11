import { useDispatch, useSelector } from "react-redux";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  forgotSuccess,
  resetSuccess,
  verifySuccess,
  refreshSuccess,
  updateSuccess,
} from "../features/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import toastNotify from "../helpers/toastNotify";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useAuthCalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { token } = useSelector((store: RootState) => store.auth);

  const register = async (userInfo: object) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}auth/register`, userInfo);
      console.log(data);
      dispatch(registerSuccess(data));
      toastNotify("success", data.message);
    } catch (error: any) {
      console.log(error);
      dispatch(fetchFail());
      toastNotify("error", error.response.data.message);
    }
  };

  const updateUser = async (userInfo: object) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.put(
        `${BASE_URL}users/${currentUser?.id}`,
        userInfo,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      dispatch(updateSuccess(data));
      toastNotify("success", data.message);
    } catch (error: any) {
      // console.log(error);
      dispatch(fetchFail());
      toastNotify("error", error.response.data.message);
      console.log(error);
    }
  };

  const login = async (userInfo: object) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}auth/login`, userInfo);
      dispatch(loginSuccess(data));
      toastNotify("success", data.message);
      navigate("/home");
    } catch (error: any) {
      // console.log(error);
      dispatch(fetchFail());
      toastNotify("error", error.response.data.message);
    }
  };

  const logout = async (showNotify: boolean) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.get(`${BASE_URL}auth/logout`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      dispatch(logoutSuccess());
      showNotify && toastNotify("success", data.message);
      navigate("/");
    } catch (error: any) {
      dispatch(fetchFail());
      showNotify && toastNotify("error", error.response.data.message);
      // console.log(error);
    }
  };

  const refresh = async (refreshToken: string) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}auth/refresh`, {
        bearer: { refresh: refreshToken },
      });
      dispatch(refreshSuccess(data));
      // toastNotify("success", "Token refreshed successfully!");
    } catch (error: any) {
      dispatch(fetchFail());
      toastNotify("error", error.response.data.message);
    }
  };

  const forgotPassword = async (email: string) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}auth/forgot`, { email });
      dispatch(forgotSuccess(data));
      toastNotify("success", data.message);
    } catch (error: any) {
      dispatch(fetchFail());
      toastNotify("error", error.response.data.message);
    }
  };

  const resetPassword = async (
    token: string,
    email: string,
    newPassword: string
  ) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}auth/reset/${token}`, {
        email,
        newPassword,
      });
      dispatch(resetSuccess(data));
      toastNotify("success", data.message);
    } catch (error: any) {
      dispatch(fetchFail());
      toastNotify("error", error.response.data.message);
    }
  };

  const verifyAccount = async (token: string) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.get(`${BASE_URL}auth/verify-email/${token}`);
      dispatch(verifySuccess(data));
      toastNotify("success", data.message);
    } catch (error: any) {
      dispatch(fetchFail());
      toastNotify("error", error.response.data.message);
    }
  };

  return {
    register,
    login,
    logout,
    updateUser,
    refresh,
    forgotPassword,
    resetPassword,
    verifyAccount,
  };
};

export default useAuthCalls;
