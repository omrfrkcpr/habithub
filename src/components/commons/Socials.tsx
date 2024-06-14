import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FaMedium } from "react-icons/fa";

function Socials() {
  return (
    <div className="flex justify-center gap-2 py-1">
      <a
        href="https://www.linkedin.com/in/omrfrkcpr/"
        target="_blank"
        rel="noreferrer"
      >
        <FaLinkedin className="hover:bg-[#0964C0] text-[#0964C0] hover:text-white hover:scale-125 text-[18px] md:text-[24px]" />
      </a>
      <a href="https://github.com/omrfrkcpr" target="_blank" rel="noreferrer">
        <FaSquareGithub className="hover:bg-black hover:text-white hover:scale-125 text-[18px] md:text-[24px]" />
      </a>
      <a
        href="https://www.linkedin.com/in/omrfrkcpr/"
        target="_blank"
        rel="noreferrer"
      >
        <FcGoogle className="hover:bg-gray-100 hover:scale-125 text-[18px] md:text-[24px]" />
      </a>

      <a
        href="https://www.linkedin.com/in/omrfrkcpr/"
        target="_blank"
        rel="noreferrer"
      >
        <FaMedium className="hover:text-white hover:bg-black hover:scale-125 text-[18px] md:text-[24px]" />
      </a>
    </div>
  );
}

export default Socials;
