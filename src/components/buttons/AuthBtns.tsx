import React, { useEffect, useState } from "react";
import gmail from "../../assets/gmail.png";
import twitter from "../../assets/twitter.png";
import github from "../../assets/github.png";
import linkedin from "../../assets/linkedin.png";
import line from "../../assets/straight-line.png";
import useAuthCalls from "../../hooks/useAuthCalls";
import { RootState } from "../../app/store";
import { fetchFail, fetchStart, loginSuccess } from "../../features/authSlice";
import axios from "axios";
import toastNotify from "../../helpers/toastNotify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const AuthBtns = () => {
  const { signInWithSocial } = useAuthCalls();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [socialAuth, setSocialAuth] = useState<boolean>(false);
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const getUser = async () => {
    if (socialAuth && !currentUser) {
      dispatch(fetchStart());
      try {
        const url = `http://127.0.0.1:8000/auth/login/success`;
        const { data } = await axios.get(url, { withCredentials: true });
        console.log(data);
        dispatch(loginSuccess(data));
        toastNotify("success", data.message);
        navigate("/contract");
        setSocialAuth(false);
      } catch (err) {
        console.log(err);
        dispatch(fetchFail());
      }
    }
  };

  console.log(currentUser);

  useEffect(() => {
    getUser();
  }, [socialAuth]);

  const handleAuthClick = (authType: string) => {
    signInWithSocial(authType);
    setSocialAuth(true);
  };

  return (
    <>
      <div className="flex justify-center items-center mt-5">
        <img src={line} alt="" className="w-[60px] md:w-[100px] opacity-50" />
        <p className="text-xs">or sign up with</p>
        <img src={line} alt="" className="w-[60px] md:w-[100px] opacity-50" />
      </div>
      <div className="flex gap-2 md:gap-5 justify-center items-center mt-2">
        <div
          className="p-2 bg-white hover:bg-gray-200 rounded-full hover:cursor-pointer"
          onClick={() => handleAuthClick("google")}
        >
          <img
            src={gmail}
            alt="gmail"
            className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]"
          />
        </div>
        <div
          className="p-2 bg-white hover:bg-gray-200 rounded-full hover:cursor-pointer"
          onClick={() => handleAuthClick("linkedin")}
        >
          <img
            src={linkedin}
            alt="linkedin"
            className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]"
          />
        </div>
        <div
          className="p-2 bg-white hover:bg-gray-200 rounded-full hover:cursor-pointer"
          onClick={() => handleAuthClick("twitter")}
        >
          <img
            src={twitter}
            alt="twitter"
            className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]"
          />
        </div>
        <div
          className="p-2 bg-white hover:bg-gray-200 rounded-full hover:cursor-pointer"
          onClick={() => handleAuthClick("github")}
        >
          <img
            src={github}
            alt="github"
            className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]"
          />
        </div>
      </div>
    </>
  );
};

export default AuthBtns;
