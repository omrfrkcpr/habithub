import React from "react";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import nothing from "../assets/NotFound.png";

const TodoList = () => {
  const { todos } = useSelector((state: RootState) => state.todo);
  return (
    <div>
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
