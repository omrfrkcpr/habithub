import React from 'react';
import { useState } from "react";
import ActionBtn from "../components/buttons/ActionBtn";
import NearMeIcon from "@mui/icons-material/NearMe";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import useAuthCalls from "../hooks/useAuthCalls";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";

const Forgot = () => {
  const [email, setEmail] = useState<string>("");
  const { forgotPassword } = useAuthCalls();
  const { loading } = useSelector((state: RootState) => state.auth);

  const handleForgotSubmit = () => {
    forgotPassword(email);
    setEmail("");
  };

  return (
    <div
      className="w-screen h-screen z-50 relative bg-habit-light-gray"
      style={{
        backgroundImage: `url(${`
        ${process.env.REACT_APP_AWS_S3_BASE_URL}auth-Bg.jpg`})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        overflow: "hidden",
      }}
    >
      <Navbar />
      <div className="absolute w-full top-[30%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col justify-center items-center">
        <form className="flex flex-col justify-between text-center w-[320px] md:w-[500px] p-5 h-auto md:h-[300px] rounded-xl">
          <div>
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
              Forgot Password
            </h2>
            <p className="text-xs md:text-md lg:text-[14px] mt-2 mb-3 font-light md:font-normal">
              Please enter your email address to reset your password. You will
              receive a link to create a new password via email.
            </p>
          </div>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Enter your email"
            className="my-4 px-2 py-1 outline-none rounded-md md:mx-4 text-[13px] md:text-[16px]"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <ActionBtn
            onClick={handleForgotSubmit}
            loading={loading}
            label="Send"
            color="purple"
            icon={<NearMeIcon sx={{ color: "white" }} />}
            edit={false}
          />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Forgot;
