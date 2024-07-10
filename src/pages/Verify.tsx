import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Logo from "../components/commons/Logo";
import { ThreeDots } from "react-loader-spinner";

const Verify = () => {
  const { token } = useParams();
  const [message, setMessage] = useState(
    "E-posta doğrulanıyor, lütfen bekleyin..."
  );

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // API request for account verification
        const response = await axios.get(
          `http://127.0.0.1:8000/auth/verify-email/${token}`
        );

        // Update message after success verification
        if (response.status === 200) {
          setMessage("Email successfully verified! You're redirecting...");

          setTimeout(() => {
            window.location.href = "http://127.0.0.1:8000/setup";
          }, 3000);
        }
      } catch (error) {
        // Update message after failed verification
        setMessage("Failed email verification. Please try again!");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="w-screen h-screen bg-habit-light-gray z-50 relative">
      <div className="absolute w-[fit-content] p-2 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
        <div className="flex gap-1 justify-center items-center">
          <Logo />
          <h1 className="text-md md:text-xl lg:text-2xl font-bold">HabitHUB</h1>
        </div>
        <p className="text-[10px] md:text-[14pxs] mt-4 flex gap-1">
          <span>{message}</span>
          <ThreeDots
            visible={true}
            height="30"
            width="30"
            color="#CA87F4"
            radius="8"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </p>
      </div>
    </div>
  );
};

export default Verify;
