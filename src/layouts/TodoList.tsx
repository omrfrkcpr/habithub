import React from "react";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import nothing from "../assets/NotFound.png";
import { formatDateString } from "../helpers/functions";

const TodoList = () => {
  const { date } = useSelector((state: RootState) => state.date);
  const { todos } = useSelector((state: RootState) => state.todo);
  return (
    <div>
      <h1 className="text-md font-semibold text-habit-light-gray text-right bg-habit-light-purple rounded-full w-[fit-content] text-[12px] md:text-[16px] px-2 py-1 my-4">
        {formatDateString(date)}
      </h1>
      {todos.length ? (
        todos.map((todo: any) => {
          return <div key={todo?.id}>{todo?.title}</div>;
        })
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
