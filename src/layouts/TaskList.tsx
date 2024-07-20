import React, { useState } from "react";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import nothing from "../assets/NotFound.png";
import { formatDateString } from "../helpers/functions";
import TaskCard from "../components/cards/TaskCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import useTaskCalls from "../hooks/useTaskCalls";

const TaskList = () => {
  const { date } = useSelector((state: RootState) => state.date);
  const { tasks } = useSelector((state: RootState) => state.task);
  const { updateTaskData } = useTaskCalls();
  const [showDesc, setShowDesc] = useState<string>("");

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const { destination, draggableId } = result;
    const draggedTask = tasks.find((task: Task) => task.id === draggableId);

    if (draggedTask) {
      const newPriority =
        destination.droppableId === "Urgent 🚀"
          ? 1
          : destination.droppableId === "Important 🌟"
          ? 0
          : -1;
      updateTaskData("tasks", draggedTask.id, { priority: newPriority });
    }
  };

  const getFilteredTasks = (priority: number) => {
    return tasks.filter((task: Task) => task.priority === priority);
  };

  return (
    <div>
      <h1 className="text-md font-semibold text-habit-light-gray text-right bg-habit-light-purple rounded-full w-[fit-content] text-[12px] md:text-[16px] px-2 py-1 my-4">
        {formatDateString(date)}
      </h1>
      {tasks.length ? (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="flex flex-col xl:flex-row gap-2">
            {["Urgent 🚀", "Important 🌟", "Do Later 🔥"].map(
              (column, index) => {
                const priority =
                  column === "Urgent 🚀"
                    ? 1
                    : column === "Important 🌟"
                    ? 0
                    : -1;
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
                          className={`text-[13px] italic md:text-[15px] lg:text-[17px] py-1 px-2 rounded-full font-semibold w-[fit-content] ms-auto mb-4 ${
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
                        <ul className="space-y-2">
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
                        </ul>
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
            src={nothing}
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
