import React from "react";
import gmail from "../../assets/gmail.png";
import apple from "../../assets/apple.png";
import facebook from "../../assets/facebook.png";

const AuthBtns = () => {
  return (
    <div className="flex gap-2 md:gap-5 justify-center items-center mt-3 md:mt-5">
      <div className="p-2 bg-white hover:bg-gray-200 rounded-full hover:cursor-pointer">
        <img
          src={gmail}
          alt="gmail"
          className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]"
        />
      </div>
      <div className="p-2 bg-white hover:bg-gray-200 rounded-full hover:cursor-pointer">
        <img
          src={apple}
          alt="apple"
          className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]"
        />
      </div>
      <div className="p-2 bg-white hover:bg-gray-200 rounded-full hover:cursor-pointer">
        <img
          src={facebook}
          alt="facebook"
          className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]"
        />
      </div>
    </div>
  );
};

export default AuthBtns;
