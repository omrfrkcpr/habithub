import React, { useState } from "react";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import nothing from "../assets/NotFound.png";
import { formatDateString } from "../helpers/functions";
import TodoCard from "../components/cards/TodoCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import useTodoCalls from "../hooks/useTodoCalls";

const TodoList = () => {
  const { date } = useSelector((state: RootState) => state.date);
  const { todos } = useSelector((state: RootState) => state.todo);
  const { updateTodoData } = useTodoCalls();
  const [showDesc, setShowDesc] = useState<string>("");

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    const draggedTodo = todos.find((todo: Todo) => todo.id === draggableId);

    if (draggedTodo) {
      const newPriority =
        destination.droppableId === "Urgent 🚀"
          ? 1
          : destination.droppableId === "Important 🌟"
          ? 0
          : -1;
      updateTodoData("todos", draggedTodo.id, { priority: newPriority });
    }
  };

  const getFilteredTodos = (priority: number) => {
    return todos.filter((todo: Todo) => todo.priority === priority);
  };

  return (
    <div>
      <h1 className="text-md font-semibold text-habit-light-gray text-right bg-habit-light-purple rounded-full w-[fit-content] text-[12px] md:text-[16px] px-2 py-1 my-4">
        {formatDateString(date)}
      </h1>
      {todos.length ? (
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
                          className={`text-[14px] md:text-[16px] lg:text-[18px] py-1 px-2 rounded-full font-semibold w-[fit-content] ms-auto mb-4 ${
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
                          {getFilteredTodos(priority).map(
                            (todo: Todo, index: number) => (
                              <Draggable
                                key={todo.id}
                                draggableId={todo.id.toString()}
                                index={index}
                              >
                                {(provided: any) => (
                                  <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <TodoCard
                                      todo={todo}
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

export default TodoList;
