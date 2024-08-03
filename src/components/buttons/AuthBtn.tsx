import React, { useState } from "react";
import useAuthCalls from "../../hooks/useAuthCalls";

const AuthBtn = () => {
  const { signInWithSocial } = useAuthCalls();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAuthClick = (authType: string) => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      signInWithSocial(authType).finally(() => {
        setIsSubmitting(false);
      });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-5">
        <img
          loading="lazy"
          src={`
          ${process.env.REACT_APP_AWS_S3_BASE_URL}straight-line.png`}
          alt=""
          className="w-[60px] md:w-[100px] opacity-50"
        />
        <p className="text-xs">or</p>
        <img
          loading="lazy"
          src={`
          ${process.env.REACT_APP_AWS_S3_BASE_URL}straight-line.png`}
          alt=""
          className="w-[60px] md:w-[100px] opacity-50"
        />
      </div>
      <div className="flex gap-2 md:gap-5 justify-center items-center mt-2">
        <div
          className="py-2 px-5 bg-white border hover:bg-[#dec6ed]  text-habit-gray duration-300 hover:text-white rounded-full hover:cursor-pointer flex justify-center items-center gap-2"
          onClick={() => handleAuthClick("google")}
        >
          <img
            loading="lazy"
            src={`
            ${process.env.REACT_APP_AWS_S3_BASE_URL}gmail.png`}
            alt="google"
            className="w-[20px] h-[20px] md:w-[24px] bg-white p-1 rounded-full md:h-[24px]"
          />
          <p className="text-[10px] md:text-[13px] font-semibold">
            Continue with Google
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthBtn;
