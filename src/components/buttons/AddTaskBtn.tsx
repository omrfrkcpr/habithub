import React from "react";
import { IoAddOutline } from "react-icons/io5";

const AddTaskBtn = () => {
  return (
    <button className="absolute bottom-10 right-10 w-[50px] h-[50px] bg-habit-light-purple border border-habit-light-purple hover:bg-habit-light-gray shadow-lg dark:bg-[#2e173a] dark:border-[#2e173a] hover:dark:bg-habit-purple rounded-full grid place-content-center place-items-center transition-colors duration-300">
      <IoAddOutline className="w-10 h-10 text-habit-light-gray hover:text-habit-light-purple dark:text-habit-purple hover:dark:text-[#2e173a] transition-colors duration-300" />
    </button>
  );
};

export default AddTaskBtn;
