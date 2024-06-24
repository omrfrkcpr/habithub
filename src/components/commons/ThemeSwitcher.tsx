import React from "react";
import useToggleTheme from "../../hooks/useToggleTheme";
import { MdNightlight } from "react-icons/md";
import { IoSunny } from "react-icons/io5";

const ThemeSwitcher: React.FC = () => {
  const { darkMode, handleToggle } = useToggleTheme();

  return (
    <button
      onClick={handleToggle}
      className=" w-10 h-10 rounded-full focus:outline-none focus:ring-1 focus:ring-offset-1 dark:focus:ring-habit-yellow focus:ring-habit-light-purple me-3 grid place-content-center place-items-center"
    >
      {darkMode ? (
        <IoSunny className="text-[16px] md:text-[20px] text-habit-yellow hover:text-yellow-200" />
      ) : (
        <MdNightlight className="text-[16px] md:text-[20px] text-habit-purple" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
