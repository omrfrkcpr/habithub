import React from "react";
import gmail from "../../assets/gmail.png";
import twitter from "../../assets/twitter.png";
import github from "../../assets/github.png";
import line from "../../assets/straight-line.png";
import useAuthCalls from "../../hooks/useAuthCalls";

const AuthBtns = () => {
  const { signInWithSocial } = useAuthCalls();

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
          onClick={() => signInWithSocial("google")}
        >
          <img
            src={gmail}
            alt="gmail"
            className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]"
          />
        </div>
        <div className="p-2 bg-white hover:bg-gray-200 rounded-full hover:cursor-pointer">
          <img
            src={twitter}
            alt="twitter"
            className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]"
          />
        </div>
        <div
          className="p-2 bg-white hover:bg-gray-200 rounded-full hover:cursor-pointer"
          onClick={() => signInWithSocial("github")}
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
