import React from "react";
import Socials from "../components/commons/Socials";

const Footer = () => {
  return (
    <div className="absolute bottom-0 flex justify-between items-center p-5 w-full bg-[#eed1f3]">
      <div>
        <p className="text-sm">
          © {new Date().getFullYear()} | HabitHub | All rights reserved
        </p>
      </div>
      <Socials />
    </div>
  );
};

export default Footer;
