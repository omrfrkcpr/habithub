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
  const { accessToken, refreshToken } = useSelector(
    (store: RootState) => store.auth
  );

  const register = async (userInfo: object) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}auth/register`, userInfo);
      console.log(data);
      dispatch(registerSuccess(data));
      toastNotify("success", data?.message);
    } catch (error: any) {
      toastNotify("error", error?.response?.data?.message);
      console.log(error);
      dispatch(fetchFail());
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
            Authorization: `Token ${accessToken}`,
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
      console.log(data);
      dispatch(loginSuccess(data));
      toastNotify("success", data.message);
      navigate("/contract");
    } catch (error: any) {
      console.log(error);
      dispatch(fetchFail());
      toastNotify("error", error?.response?.data?.message);
    }
  };

  const logout = async (showNotify: boolean) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.get(`${BASE_URL}auth/logout`, {
        headers: {
          Authorization: `Token ${accessToken}`,
        },
      });
      dispatch(logoutSuccess());
      showNotify && toastNotify("success", data.message);
      showNotify && navigate("/");
    } catch (error: any) {
      dispatch(fetchFail());
      showNotify && toastNotify("error", error.response.data.message);
      // console.log(error);
    }
  };

  const refresh = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}auth/refresh`, {
        bearer: refreshToken,
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

  const signInWithSocial = async (consumerName: string) => {
    dispatch(fetchStart());
    try {
      // window.location.href = `${BASE_URL}auth/${consumerName}`;
      window.open(`http://127.0.0.1:8000/auth/${consumerName}`, "_self");

      // // Handle the response after redirection
      // const handleSocialCallback = () => {
      //   const cookies = getCookies();

      //   const accessToken = cookies.accessToken;
      //   const refreshToken = cookies.refreshToken;
      //   const user = JSON.parse(cookies.user || "{}");
      //   const tokenData = JSON.parse(cookies.tokenData || "{}");

      //   if (accessToken && refreshToken && user && tokenData) {
      //     const data = {
      //       bearer: { access: accessToken, refresh: refreshToken },
      //       token: tokenData.token,
      //       user,
      //     };
      //     console.log(data);
      //     dispatch(loginSuccess(data));
      //     toastNotify("success", "You are successfully logged in!");
      //   } else {
      //     dispatch(fetchFail());
      //     toastNotify("error", "Authentication failed");
      //   }
      // };

      // // Call the callback function to handle the response
      // handleSocialCallback();
    } catch (error: any) {
      dispatch(fetchFail());
      toastNotify("error", error.message);
      console.log(error);
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
    signInWithSocial,
  };
};

export default useAuthCalls;
