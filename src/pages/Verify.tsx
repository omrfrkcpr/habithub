import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Logo from "../components/commons/Logo";
import { ThreeDots } from "react-loader-spinner";
import toastNotify from "../helpers/toastNotify";

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(
    "Email is being verified, please wait"
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const verifyEmail = async () => {
      setLoading(true);
      try {
        // API request for account verification
        const response = await axios.get(
          `http://127.0.0.1:8000/auth/verify-email/${token}`
        );

        // Update message after success verification
        if (response.status === 200) {
          setMessage("Email successfully verified! You're redirecting...");
          toastNotify("success", "Your account successfully verified!");

          setTimeout(() => {
            window.location.href = "http://127.0.0.1:8000/setup";
          }, 3000);
        }
      } catch (error) {
        // Update message after failed verification
        setMessage("Failed email verification. Please try again!");
        toastNotify("error", "Verification failed due to invalid request");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="w-screen h-screen bg-habit-light-gray z-50 relative">
      <div className="absolute w-[350px] md:w-[400px] p-2 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-center flex flex-col items-center justify-center">
        <Logo single={true} />
        <p className="text-[10px] md:text-[14px] mt-4 flex gap-2">
          <span className="text-sm md:text-lg text-[#ce8ef6]">{message}</span>
          {loading && (
            <ThreeDots
              visible={true}
              height="20"
              width="20"
              color="#CA87F4"
              radius="8"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          )}
        </p>
        <button
          onClick={() => navigate("/")}
          className="text-[10px] md:text-[14px] py-1 px-2 text-center bg-habit-light-purple text-white rounded-xl hover:bg-purple-300 mt-10"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Verify;
