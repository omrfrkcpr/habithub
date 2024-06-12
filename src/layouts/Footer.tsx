import React from "react";
import Socials from "../components/commons/Socials";

const Footer = () => {
  return (
    <div className="flex justify-between items-center py-3 px-5 md:p-5 w-full bg-[#eed1f3]">
      <div>
        <p className="text-[10px] md:text-md lg:text-lg">
          © {new Date().getFullYear()} | HabitHub | All rights reserved
        </p>
      </div>
      <Socials />
    </div>
  );
};

export default Footer;
