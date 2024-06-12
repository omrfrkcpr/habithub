import React from "react";
import logo from "../../assets/habitHub.png";

function Logo() {
  return (
    <div>
      <img
        src={logo}
        alt="logo-img"
        className="w-[30px] h-[30px] md:w-[60px] md:h-[60px] "
      />
    </div>
  );
}

export default Logo;
