import React, { useEffect, useState, useRef } from "react";
import useTaskCalls from "../../hooks/useTaskCalls";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import TaskCardSettingBtns from "../buttons/TaskCardSettingBtns";

const TaskCard: React.FC<TaskCardProps> = ({ task, showDesc, setShowDesc }) => {
  // console.log(task);
  const { updateTaskData } = useTaskCalls();
  const { id, name, cardColor, priority, isCompleted, description, tagId } =
    task;
  const [isDone, setIsDone] = useState<boolean>();
  const descRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    setIsDone(isCompleted);
  }, [isCompleted]);

  const handleCompleteTaskClick = async (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (descRef.current && descRef.current.contains(e.target as Node)) {
      // Description span clicked, do nothing
      return;
    }

    // setIsDone((prevState) => !prevState);
    updateTaskData("tasks", id, { isCompleted: !isDone });
  };

  const handleShowDescClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent handleCompleteTaskClick from being triggered
    if (showDesc !== id) {
      setShowDesc(id);
    } else {
      setShowDesc("");
    }
  };

  return (
    <div
      className={`py-2 px-2 rounded-md relative cursor-pointer ${
        priority === 1
          ? "bg-red-200"
          : priority === 0
          ? "bg-orange-200"
          : priority === -1 && "bg-green-200"
      }`}
      // style={{ backgroundColor: cardColor }}
      onClick={handleCompleteTaskClick}
    >
      <div>
        <div className="flex gap-1 w-max">
          <div className="inline-flex items-center">
            <label
              className="relative flex items-center rounded-full cursor-pointer"
              htmlFor="purple"
            >
              <input
                type="checkbox"
                className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-purple-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-purple-gray-500 before:opacity-0 before:transition-opacity border-black/60 checked:border-purple-500 checked:bg-purple-500 checked:before:bg-purple-500 hover:before:opacity-10"
                id="purple"
                checked={isDone}
                readOnly
              />
              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="1"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
          </div>
          <span
            className={`${isDone && "line-through"} text-[12px] font-semibold
           md:text-[15px] xl:text-[13px] 2xl:text-[15px] p-1`}
            style={{ color: isDone ? "gray" : cardColor }}
          >
            {name}
          </span>
          <div className="absolute right-2 top-[10px] flex gap-1 justify-center items-center">
            <TaskCardSettingBtns />
            <button
              onClick={handleShowDescClick}
              className="cursor-pointer hover:text-black/60"
            >
              {showDesc === id ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
          </div>
        </div>
        <div
          className={`ms-[20px] flex transition-all duration-500 ease-in-out transform origin-top overflow-hidden text-[10px] md:text-[14px] xl:text-[12px] 2xl:text-[14px] relative ${
            isDone && "line-through text-black/30"
          } ${
            showDesc === id ? "max-h-auto opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <span ref={descRef} className="mt-2 me-[100px]">
            {description}
          </span>
          <span className="bg-black/70 text-white absolute w-[fit-content] top-1 right-0  px-2 py-1 ms-auto rounded-full text-[9px] md:text-[11px] xl:text-[9px] 2xl:text-[11px]">
            {tagId?.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
