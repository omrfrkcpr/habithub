import React, { useEffect } from "react";
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
  const { currentUser, accessToken } = useSelector(
    (state: RootState) => state.auth
  );
  const { getTaskData } = useTaskCalls();

  console.log("accessToken :", accessToken);

  // useEffect(() => {
  //   const getUser = async () => {
  //     dispatch(fetchStart());
  //     try {
  //       const url = `${process.env.REACT_APP_BASE_URL}auth/login/success`;
  //       const { data } = await axios.get(url);
  //       console.log(data);
  //       dispatch(loginSuccess(data));
  //       toastNotify("success", data.message);
  //     } catch (err: any) {
  //       console.log(err);
  //       // toastNotify("error", err?.response?.data?.message);
  //       dispatch(fetchFail());
  //     }
  //   };
  //   getUser();
  // }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userParam = queryParams.get("user");

    if (!userParam) {
      navigate("/signin"); // Redirect to signin if successUrl param is missing
    }

    const parsedData = JSON.parse(decodeURIComponent(userParam ?? ""));
    dispatch(loginSuccess(parsedData));
    toastNotify("success", parsedData?.message);
  }, []);

  useEffect(() => {
    if (currentUser?.id) {
      setTimeout(() => {
        getTaskData("tasks", `?date=${date}`);
        getTaskData("tags");
      }, 2000);

      setTimeout(() => {
        if (currentUser.isAgreed) {
          navigate("/home");
        } else {
          navigate("/contract");
        }
      }, 3000);
    }
  }, [currentUser]);

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
