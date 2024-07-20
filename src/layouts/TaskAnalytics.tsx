import React from "react";
import useDate from "../hooks/useDate";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";

const TaskAnalytics = ({
  setValue,
}: {
  setValue: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handleDateChange = useDate(setValue);
  const { todayTasks } = useSelector((state: RootState) => state.task);

  const handleTodayClick = () => {
    handleDateChange(new Date());
  };

  //Todo = To list eacy tag item with its length use groupBy method in JS

  return (
    <div className="w-full px-2 space-y-4 pb-2">
      <div className="w-full my-1">
        <h1 className="font-semibold text-[10px] md:text-[14px] border-b border-gray-100">
          Tasks
        </h1>
        <button
          onClick={handleTodayClick}
          className="flex w-full justify-between py-1 px-2 focus:bg-gray-300 dark:focus:text-black hover:bg-gray-100 dark:hover:text-black"
        >
          <span>Today</span>
          <span>{todayTasks.length}</span>
        </button>
      </div>
      <div className="w-full my-1">
        <h1 className="font-semibold text-[10px] md:text-[14px] border-b border-gray-100">
          Lists
        </h1>
        <button className="flex w-full justify-between py-1 px-2">
          <span>Daily Routine</span>
          <span>1</span>
        </button>
        <button className="flex w-full justify-between py-1 px-2">
          <span>Work Routine</span>
          <span>3</span>
        </button>
      </div>
    </div>
  );
};

export default TaskAnalytics;
