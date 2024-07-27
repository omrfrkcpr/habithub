import React, { useState, useEffect, useRef } from "react";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { formatDateString } from "../helpers/functions";
import TaskCard from "../components/cards/TaskCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import useTaskCalls from "../hooks/useTaskCalls";
import { FaInfoCircle } from "react-icons/fa";
import { CgExport } from "react-icons/cg";
import ExportBtns from "../components/buttons/ExportBtns";
import styled from "styled-components";

const CustomScrollUl = styled.ul<{ $scrollbarColor: string }>`
  max-height: 200px;
  overflow: auto;
  margin-bottom: 10px;
  list-style: none;
  padding: 0 10px 0 0;

  & > li + li {
    margin-top: 5px; // gap between list items
  }

  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props: any) => props.scrollbarColor};
    border-radius: 9999px;
    border: 3px solid #edf2f7;
  }

  &::-webkit-scrollbar-track {
    background-color: #edf2f7;
    border-radius: 9999px;
  }
`;

const TaskList = () => {
  const { date } = useSelector((state: RootState) => state.date);
  const { tasks } = useSelector((state: RootState) => state.task);
  const { updateTaskData } = useTaskCalls();
  const [showDesc, setShowDesc] = useState<string>("");
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [showExport, setShowExports] = useState<boolean>(false);
  const infoRef = useRef<HTMLDivElement>(null);
  const descButtonRef = useRef<HTMLButtonElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const exportBtnRef = useRef<HTMLButtonElement>(null);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const { destination, draggableId } = result;
    const draggedTask = tasks.find((task: Task) => task.id === draggableId);

    if (draggedTask) {
      const newPriority =
        destination.droppableId === "Urgent 🚀"
          ? 1
          : destination.droppableId === "Important 🔥"
          ? 0
          : -1;
      updateTaskData("tasks", draggedTask.id, { priority: newPriority });
    }
  };

  const getFilteredTasks = (priority: number) => {
    return tasks.filter((task: Task) => task.priority === priority);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        infoRef.current &&
        !infoRef.current.contains(event.target as Node) &&
        descButtonRef.current &&
        !descButtonRef.current.contains(event.target as Node)
      ) {
        setShowInfo(false);
      }

      if (
        exportRef.current &&
        !exportRef.current.contains(event.target as Node) &&
        exportBtnRef.current &&
        !exportBtnRef.current.contains(event.target as Node)
      ) {
        setShowExports(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="pb-20 md:pb-10">
      <h1 className="text-md font-semibold text-habit-light-gray text-right bg-habit-light-purple rounded-full w-[fit-content] text-[12px] md:text-[16px] px-2 py-1 my-4">
        {formatDateString(date)}
      </h1>
      {tasks.length > 0 && (
        <>
          <div className="absolute top-[75px] right-7 md:right-14 md:top-[77px]">
            <button
              ref={exportBtnRef}
              onClick={() => setShowExports((prevState) => !prevState)}
              className="flex gap-1 items-center justify-center py-1 px-2 rounded-md bg-black/80 hover:bg-black/50 dark:bg-habit-white dark:hover:bg-gray-200 text-white dark:text-black text-[11px] md:text-[15px]"
            >
              <CgExport />
              <span>Export</span>
            </button>
            {showExport && (
              <div
                ref={exportRef}
                className="clip-message-box2 absolute right-0 top-7 md:top-9 w-[90px] md:w-[120px] z-50 bg-[#ededed]"
              >
                <ExportBtns setShowExports={setShowExports} />
              </div>
            )}
          </div>
          <div className="absolute top-[75px] right-0 md:top-[77px] md:right-5">
            <button
              ref={descButtonRef}
              onClick={() => setShowInfo((prevState) => !prevState)}
              className="text-[20px] text-black/80 hover:text-black/50  dark:text-white dark:hover:text-gray-200 py-1"
            >
              <FaInfoCircle />
            </button>
            {showInfo && (
              <div
                ref={infoRef}
                className="clip-message-box2 mt-2 mb-3 text-[10px] md:text-[12px] font-light md:font-normal absolute w-[200px] right-0 bg-[#ededed] rounded-md top-7 z-50 py-5 px-4 flex flex-col gap-2 "
              >
                <span>
                  To see the tasks for other days, please select the relevant
                  day from the calendar from the sidebar menu.
                </span>
                <span>
                  To change the priority of a task, simply drag and drop it into
                  the desired priority section.
                </span>
              </div>
            )}
          </div>
        </>
      )}

      {tasks.length ? (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="flex flex-col xl:flex-row gap-2">
            {["Urgent 🚀", "Important 🔥", "Deferred 🍀"].map(
              (column, index) => {
                const priority =
                  column === "Urgent 🚀"
                    ? 1
                    : column === "Important 🔥"
                    ? 0
                    : -1;
                const scrollbarColor =
                  priority === 1
                    ? "#f87171" // red-400
                    : priority === 0
                    ? "#fb923c" // orange-400
                    : "#34d399"; // green-400

                return (
                  <Droppable droppableId={column} key={column}>
                    {(provided: any) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`w-full xl:w-1/3 p-3 bg-gray-200 rounded-lg min-h-[150px] h-auto ${
                          priority === 1
                            ? "bg-red-300"
                            : priority === 0
                            ? "bg-orange-300"
                            : priority === -1
                            ? "bg-green-300"
                            : ""
                        }`}
                      >
                        <h2
                          className={`text-[13px] text-gray-700 italic md:text-[15px] lg:text-[17px] py-1 px-2 rounded-full font-semibold w-[fit-content] ms-auto mb-4 ${
                            priority === 1
                              ? "bg-red-400"
                              : priority === 0
                              ? "bg-orange-400"
                              : priority === -1
                              ? "bg-green-400"
                              : ""
                          }`}
                        >
                          {column}
                        </h2>
                        <CustomScrollUl $scrollbarColor={scrollbarColor}>
                          {getFilteredTasks(priority).map(
                            (task: Task, index: number) => (
                              <Draggable
                                key={task.id}
                                draggableId={task.id.toString()}
                                index={index}
                              >
                                {(provided: any) => (
                                  <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <TaskCard
                                      task={task}
                                      showDesc={showDesc}
                                      setShowDesc={setShowDesc}
                                    />
                                  </li>
                                )}
                              </Draggable>
                            )
                          )}
                          {provided.placeholder}
                        </CustomScrollUl>
                      </div>
                    )}
                  </Droppable>
                );
              }
            )}
          </div>
        </DragDropContext>
      ) : (
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col justify-center items-center">
          <img
            loading="lazy"
            src={`
              ${process.env.REACT_APP_AWS_S3_BASE_URL}NotFound.png`}
            alt="nothing"
            className="md:w-[340px] md:h-[300px] object-cover"
          />
          <h1 className="text-[17px] text-black/70 font-semibold dark:text-white/70">
            Nothing here yet...
          </h1>
        </div>
      )}
    </div>
  );
};

export default TaskList;
