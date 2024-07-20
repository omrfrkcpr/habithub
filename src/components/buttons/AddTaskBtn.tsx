import React from "react";
import { IoAddOutline } from "react-icons/io5";

const AddTaskBtn = ({
  value,
  setValue,
}: {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <>
      {value !== 2 && (
        <button className="fixed bottom-4 right-4 md:bottom-10 md:right-10 w-[50px] h-[50px] bg-habit-light-purple border border-habit-light-purple shadow-md shadow-black dark:shadow-habit-light-purple dark:bg-[#CA87F4] dark:border-[#CA87F4] rounded-full grid place-content-center place-items-center transition-colors duration-300 z-40 group hover:bg-habit-light-gray dark:hover:bg-habit-purple">
          <div className="group-hover:text-habit-light-gray dark:group-hover:text-[#CA87F4]">
            <IoAddOutline
              onClick={() => setValue(2)}
              className="w-10 h-10 text-habit-light-gray dark:text-habit-purple transition-colors duration-300 group-hover:text-habit-light-purple dark:group-hover:text-[#CA87F4]"
            />
          </div>
        </button>
      )}
    </>
  );
};

export default AddTaskBtn;
