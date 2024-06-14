import React, { useState } from "react";
import AuthBtns from "../buttons/AuthBtns";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import line from "../../assets/straight-line.png";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[80%] md:w-[80%] lg:w-[60%] h-auto max-w-[650px] max-h-[fit-content] bg-[#f8f9fab9] shadow-md rounded-lg p-3 mt-2 text-center">
      <h3 className="text-habit-light-purple font-bold text-center text-[15px] md:text-[20px] mt-4">
        Get started with your account
      </h3>
      <p className="w-[80%] md:w-[70%] mx-auto text-[10px] xl:text-[13px] font-light text-center mt-4">
        Track your habits. Achieve your goals. Do it all with HabitHub's Task
        Management Platform. Already have an account?{" "}
        <span
          onClick={() => navigate("/signin")}
          className="text-blue-400 font-semibold hover:underline cursor-pointer"
        >
          Log in
        </span>
      </p>
      <form
        onSubmit={handleLogin}
        className="flex flex-col justify-center items-center"
      >
        <input
          type="text"
          placeholder="Email"
          className="w-[90%] md:w-[50%] mx-auto text-[10px] md:text-[13px] placeholder:font-light outline-none mt-4 py-2 px-3 rounded-lg "
        />
        <input
          type="text"
          placeholder="Username"
          className="w-[90%] md:w-[50%] mx-auto text-[10px] md:text-[13px] placeholder:font-light outline-none mt-3 py-2 px-3 rounded-lg "
        />
        <div className="w-[90%] md:w-[50%] mx-auto text-center relative">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="w-full text-[10px] md:text-[13px] placeholder:font-light outline-none mt-3 py-2 px-3 rounded-lg "
          />
          <div
            onClick={() => setShowPass((prevState) => !prevState)}
            className="absolute right-4 top-6 md:top-7 text-gray-600 cursor-pointer"
          >
            {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
          </div>
        </div>
        <div className="w-[90%] md:w-[50%] mx-auto text-center relative">
          <input
            type={showConfirmPass ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full text-[10px] md:text-[13px] placeholder:font-light outline-none mt-3 py-2 px-3 rounded-lg "
          />
          <div
            onClick={() => setShowConfirmPass((prevState) => !prevState)}
            className="absolute right-4 top-6 md:top-7 text-gray-600 cursor-pointer"
          >
            {showConfirmPass ? <FaRegEyeSlash /> : <FaRegEye />}
          </div>
        </div>
        <p className="text-[10px] font-light mt-5 md:mt-10 w-[80%] max-w-[400px]">
          By clicking the "Get Started!" button, you are creating a HabitHUB
          account, and you agree to HabitHUB's{" "}
          <span className="font-semibold text-blue-400 underline hover:text-blue-600 cursor-pointer">
            Terms of Use
          </span>{" "}
          and{" "}
          <span className="font-semibold text-blue-400 underline hover:text-blue-600 cursor-pointer">
            Privacy Policy
          </span>
        </p>
        <button
          type="submit"
          className="w-[150px] py-1 shadow-md rounded-xl mx-auto text-[13px] md:text-[18px] text-center mt-5 bg-white hover:bg-gray-200 font-medium"
        >
          Get Started!
        </button>
      </form>
      <div className="flex justify-center items-center mt-7">
        <img src={line} alt="" className="w-[60px] md:w-[100px] opacity-50" />
        <p className="text-xs">or sign up with</p>
        <img src={line} alt="" className="w-[60px] md:w-[100px] opacity-50" />
      </div>
      <AuthBtns />
    </div>
  );
};

export default SignUpForm;
