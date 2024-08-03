import React from "react";
import Logo from "../components/commons/Logo";
import { useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "../helpers/constants";

interface NavigateBtnProps {
  to: string;
  label: string;
}

const Navbar: React.FC = () => {
  return (
    <div className="flex justify-between items-center absolute top-0 px-5 md:px-20 w-full border-b z-50 border-gray-300 h-[60px]">
      <Logo single={false} />
      <div className="flex md:gap-3">
        {NAV_ITEMS.map((item: NavigateBtnProps) => (
          <NavigateBtn key={item.to} to={item.to} label={item.label} />
        ))}
      </div>
    </div>
  );
};

const NavigateBtn: React.FC<NavigateBtnProps> = ({ to, label }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="text-xs md:text-md lg:text-[16px] hover:bg-gray-100 py-2 px-3 rounded-full duration-300"
    >
      {label}
    </button>
  );
};

export default Navbar;
