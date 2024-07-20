import React, { useEffect, useState, useRef } from "react";
import useTaskCalls from "../../hooks/useTaskCalls";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

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
          ? "bg-red-500"
          : priority === 0
          ? "bg-orange-500"
          : priority === -1 && "bg-green-500"
      }`}
      // style={{ backgroundColor: cardColor }}
      onClick={handleCompleteTaskClick}
    >
      <div className="me-8">
        <input
          type="checkbox"
          className="me-2 cursor-pointer"
          checked={isDone}
          readOnly
        />
        <span
          className={`${
            isDone ? "line-through text-black/30" : "text-white"
          } text-[12px] md:text-[16px]`}
        >
          {name}
        </span>

        <button
          onClick={handleShowDescClick}
          className="absolute right-3 top-3 cursor-pointer hover:text-black/60"
        >
          {showDesc === id ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
      </div>
      <div
        className={`ms-[20px] flex flex-col transition-all duration-500 ease-in-out transform origin-top overflow-hidden text-[10px] md:text-[14px] ${
          isDone && "line-through text-black/30"
        } ${showDesc === id ? "max-h-auto opacity-100" : "max-h-0 opacity-0"}`}
      >
        <span className="bg-black/70 text-white w-[fit-content] px-2 py-1 ms-auto rounded-full mt-2 text-[9px] md:text-[11px]">
          {tagId?.name}
        </span>
        <span ref={descRef}>{description}</span>
      </div>
    </div>
  );
};

export default TaskCard;
