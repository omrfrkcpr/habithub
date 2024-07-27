import React from "react";
import { useNavigate } from "react-router-dom";

function Logo({ single }: { single: boolean }) {
  const navigate = useNavigate();
  return (
    <div
      className="flex gap-1 justify-center items-center mt-2"
      onClick={() => navigate("/")}
    >
      <img
        loading="lazy"
        src={`
          ${process.env.REACT_APP_AWS_S3_BASE_URL}habitHub.png`}
        alt="logo-img"
        className={`${
          single
            ? "w-[70px] h-[70px] md:w-[100px] md:h-[100px]"
            : "w-[30px] h-[30px] md:w-[60px] md:h-[60px]"
        }  `}
      />
      <h1
        className={`${
          single
            ? "text-lg md:text-2xl lg:text-3xl"
            : "text-md md:text-xl lg:text-2xl"
        }  font-bold`}
      >
        HabitHUB
      </h1>
    </div>
  );
}

export default Logo;
