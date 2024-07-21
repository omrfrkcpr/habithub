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
  const { todayTasks, todayTaskDetails } = useSelector(
    (state: RootState) => state.task
  );

  const handleTodayClick = () => {
    handleDateChange(new Date());
  };

  const countCompletedTasks = (tasks: Task[], tagId?: string) => {
    if (!tasks) return 0; // Return 0 if tasks are undefined

    // If tagId is provided, filter tasks by tagId and check if completed
    if (tagId) {
      return tasks.filter(
        (task: Task) => task?.tagId?.id === tagId && task?.isCompleted
      ).length;
    }

    // If tagId is not provided, just filter by isCompleted
    return tasks.filter((task: Task) => task?.isCompleted).length;
  };

  // console.log(todayTaskDetails);

  //Todo = To list eacy tag item with its length use groupBy method in JS

  const { lists = [], total = 0 }: TodayTaskDetails = todayTaskDetails || {};

  return (
    <div className="w-full space-y-4 pb-2">
      <div className="w-full my-1">
        <h1 className="font-semibold text-[10px] md:text-[14px] px-4">Tasks</h1>
        <button
          onClick={handleTodayClick}
          className="flex w-full justify-between py-2 px-5 focus:bg-gray-300 dark:focus:text-black hover:bg-gray-100 dark:hover:text-black text-[11px] md:text-[15px] font-light"
        >
          <span>Today</span>
          <span>
            {countCompletedTasks(todayTasks)}/{total}
          </span>
        </button>
      </div>
      <div className="w-full my-1">
        <h1 className="font-semibold text-[10px] md:text-[14px] px-4">Lists</h1>
        {lists.map((details: ListValues) => {
          const { tagId, name, count } = details;
          const completedCount = countCompletedTasks(todayTasks, tagId);
          return (
            <button
              key={tagId}
              className="flex w-full justify-between py-1 px-5 text-[11px] md:text-[15px] font-light"
            >
              <span>{name}</span>
              <span>
                {completedCount}/{count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TaskAnalytics;
