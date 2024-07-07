import { useDispatch, useSelector } from "react-redux";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
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
      // console.log(data);
      dispatch(registerSuccess(data));
      navigate("/");
      toastNotify("success", "You're successfully registered!");
    } catch (error) {
      dispatch(fetchFail());
      toastNotify(
        "error",
        "The register request could not be performed, Please try again!"
      );
      console.log(error);
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
      toastNotify("success", "Your profile has been updated successfully!");
    } catch (error) {
      dispatch(fetchFail());
      toastNotify(
        "error",
        "The update request could not be performed, Please try again!"
      );
      console.log(error);
    }
  };

  const login = async (userInfo: object) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}auth/login`, userInfo);
      dispatch(loginSuccess(data));
      toastNotify("success", "You're successfully logged in!");
      navigate("/contract");
    } catch (error) {
      dispatch(fetchFail());
      toastNotify(
        "error",
        "The login request could not be performed, Please try again!"
      );
      console.log(error);
    }
  };

  const logout = async (showNotify: boolean) => {
    dispatch(fetchStart());
    try {
      await axios.get(`${BASE_URL}auth/logout`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      dispatch(logoutSuccess());
      showNotify && toastNotify("success", "You're successfully logged out!");
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      showNotify &&
        toastNotify(
          "error",
          "The logout request could not be performed, Please try again!"
        );
      console.log(error);
    }
  };

  return { register, login, logout, updateUser };
};

export default useAuthCalls;
