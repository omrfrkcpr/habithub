import { useDispatch, useSelector } from "react-redux";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  forgotSuccess,
  resetSuccess,
  // verifySuccess,
  refreshSuccess,
  updateSuccess,
} from "../features/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import toastNotify from "../helpers/toastNotify";
import showSwal from "../helpers/showSwal";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useAuthCalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { accessToken, refreshToken } = useSelector(
    (store: RootState) => store.auth
  );

  // console.log(accessToken);
  // console.log(refreshToken);

  const register = async (userInfo: object) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}auth/register`, userInfo);
      console.log(data);
      dispatch(registerSuccess(data));
      toastNotify("info", data?.message);
      navigate("/signin");
    } catch (error: any) {
      toastNotify("error", error?.response?.data?.message);
      console.log(error);
      dispatch(fetchFail());
    }
  };

  const updateUser = async (userInfo: object) => {
    const result = await showSwal({
      title: "Are you sure?",
      text: `Account informations will be updated`,
      icon: "question",
      confirmButtonText: "Yes, change it!",
      confirmButtonColor: "#37901e",
      cancelButtonText: "No, keep it!",
    });

    if (result.isConfirmed) {
      dispatch(fetchStart());
      try {
        const { data } = await axios.put(
          `${BASE_URL}users/${currentUser?.id}`,
          userInfo,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
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
    }
  };

  const deleteUser = async () => {
    const result = await showSwal({
      title: "Are you sure?",
      text: `This Account will be permanently deleted!`,
      icon: "question",
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#37901e",
      cancelButtonText: "No, keep it!",
    });

    if (result.isConfirmed) {
      dispatch(fetchStart());
      try {
        const { data } = await axios.delete(
          `${BASE_URL}users/${currentUser?.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        dispatch(logoutSuccess(data));
        toastNotify("success", data.message);
        navigate("/");
      } catch (error: any) {
        dispatch(fetchFail());
        toastNotify("error", error.response.data.message);
        // console.log(error);
      }
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

  const refresh = async (showNotify: boolean) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}auth/refresh`, {
        bearer: { refresh: refreshToken },
      });
      dispatch(refreshSuccess(data));
      showNotify &&
        toastNotify(
          "success",
          "Your session has been successfully extended by 45 minutes!"
        );
    } catch (error: any) {
      dispatch(fetchFail());
      showNotify && toastNotify("error", error.response.data.message);
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

  // const verifyAccount = async (token: string) => {
  //   dispatch(fetchStart());
  //   try {
  //     const { data } = await axios.post(
  //       `${BASE_URL}auth/verify-email/${token}`
  //     );
  //     dispatch(verifySuccess(data));
  //     toastNotify("success", data.message);
  //   } catch (error: any) {
  //     dispatch(fetchFail());
  //     toastNotify("error", error.response.data.message);
  //   }
  // };

  const signInWithSocial = async (consumerName: string) => {
    window.open(`/auth/${consumerName}`, "_self");
  };

  const agreeContract = async () => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}users/agree-contract/${currentUser?.id}`
      );
      dispatch(updateSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    register,
    login,
    logout,
    updateUser,
    deleteUser,
    refresh,
    forgotPassword,
    resetPassword,
    // verifyAccount,
    agreeContract,
    signInWithSocial,
  };
};

export default useAuthCalls;
