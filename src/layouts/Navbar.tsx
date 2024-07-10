import React from "react";
import Logo from "../components/commons/Logo";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center absolute top-0 px-5 md:px-20 w-full border-b z-50 border-gray-300 h-[60px]">
      <Logo single={false} />
      <div className="flex md:gap-3">
        <button
          onClick={() => navigate("/")}
          className="text-xs md:text-md lg:text-[16px] hover:bg-gray-100 py-2 px-3 rounded-full"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/about")}
          className="text-xs md:text-md lg:text-[16px] hover:bg-gray-100 py-2 px-3 rounded-full"
        >
          About Us
        </button>
        <button
          onClick={() => navigate("/contact")}
          className="text-xs md:text-md lg:text-[16px] hover:bg-gray-100 py-2 px-3 rounded-full"
        >
          Contact
        </button>
      </div>
    </div>
  );
};

export default Navbar;
