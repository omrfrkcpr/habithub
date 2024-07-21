import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, loginSuccess } from "../features/authSlice";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toastNotify from "../helpers/toastNotify";
import { CircleLoader } from "react-spinners";

const AuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getUser = async () => {
      dispatch(fetchStart());
      try {
        const url = `http://127.0.0.1:8000/auth/login/success`;
        const { data } = await axios.get(url, { withCredentials: true });
        console.log(data);
        dispatch(loginSuccess(data));
        toastNotify("success", data.message);
        navigate("/contract");
      } catch (err: any) {
        console.log(err);
        // toastNotify("error", err?.response?.data?.message);
        dispatch(fetchFail());
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const provider = queryParams.get("provider");

    if (!provider) {
      navigate("/signin"); // Redirect to signin if successUrl param is missing
    }
  }, [location.search]);

  return (
    <div className="flex items-center flex-col justify-center h-screen gap-4">
      <CircleLoader size={60} color={"#CA87F4"} loading={true} />
      <div className="text-center w-[90%] md:text-[fit-content]">
        <p className="text-lg md:text-xl font-bold mb-2">
          Successfully authenticated with {getServiceName()}.
        </p>
        <p className="text-md md:text-lg">Redirecting...</p>
      </div>
    </div>
  );
};

const getServiceName = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const provider = queryParams.get("provider");

  if (provider === "google") {
    return "Google";
  } else if (provider === "github") {
    return "Github";
  } else if (provider === "twitter") {
    return "Twitter";
  } else {
    return "the social service";
  }
};

export default AuthSuccess;
