import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../features/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import toastNotify from "../helpers/toastNotify";
import { CircleLoader } from "react-spinners";
import { RootState } from "../app/store";
import useTaskCalls from "../hooks/useTaskCalls";

const AuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { date } = useSelector((state: RootState) => state.date);
  const { getTaskData } = useTaskCalls();

  const getDataFromUrl = async () => {
    const queryParams = new URLSearchParams(location.search);
    const userParam = queryParams.get("user");

    if (!userParam) {
      navigate("/signin"); // Redirect to signin if successUrl param is missing
    }

    const parsedData = JSON.parse(decodeURIComponent(userParam ?? ""));
    dispatch(loginSuccess(parsedData));

    const { message, bearer, user } = parsedData;

    toastNotify("success", message);

    await getTaskData("tasks", `?date=${date}`, bearer?.access);
    await getTaskData("tags", "", bearer?.access);

    if (user?.isAgreed) {
      navigate("/home");
    } else {
      navigate("/contract");
    }
  };

  useEffect(() => {
    getDataFromUrl();
  }, []);

  const { serviceName, serviceImage } = getService();

  return (
    <div className="flex items-center flex-col justify-center h-screen gap-4">
      <img
        loading="lazy"
        src={serviceImage}
        alt={`${serviceName} Auth`}
        className="w-[250px] h-[150px] md:w-[360px] md:h-[200px] lg:w-[500px] lg:h-[280px] object-cover mb-4"
      />
      <div className="text-center w-[90%] md:text-[fit-content]">
        <p className="text-lg md:text-xl font-bold mb-2">
          Successfully authenticated with {serviceName}.
        </p>
        <p className="text-md md:text-lg">Redirecting...</p>
      </div>
      <CircleLoader
        size={40}
        className="text-[#CA87F4] dark:text-white"
        loading={true}
      />
    </div>
  );
};

const getService = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const provider = queryParams.get("provider");

  if (provider === "google") {
    return {
      serviceName: "Google",
      serviceImage: `
      ${process.env.REACT_APP_AWS_S3_BASE_URL}Google-Habithub-Auth.png`,
    };
  } else if (provider === "github") {
    return {
      serviceName: "Github",
      serviceImage: `
      ${process.env.REACT_APP_AWS_S3_BASE_URL}Github-Habithub-Auth.png`,
    };
  } else if (provider === "twitter") {
    return {
      serviceName: "Twitter",
      serviceImage: `
      ${process.env.REACT_APP_AWS_S3_BASE_URL}Twitter-Habithub-Auth.png`,
    };
  } else {
    return { serviceName: "the social service", serviceImage: "" };
  }
};

export default AuthSuccess;
