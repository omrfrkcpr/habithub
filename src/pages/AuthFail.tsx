import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircleLoader } from "react-spinners";

const AuthFail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/signin");
    }, 3000); // redirect to signin page after 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center flex-col justify-center h-screen gap-4">
      <CircleLoader size={60} color={"#CA87F4"} loading={true} />
      <div className="text-center w-[90%] md:text-[fit-content]">
        <p className="text-lg md:text-xl font-bold mb-2">
          Authentication Failed! Redirecting to Sign in page...
        </p>
        <p className="text-md md:text-lg">Please try again.</p>
      </div>
    </div>
  );
};

export default AuthFail;
