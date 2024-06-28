import React from "react";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";

const TodoList = () => {
  const { todos } = useSelector((state: RootState) => state.todo);
  return (
    <div>
      {todos &&
        todos.map((todo: any) => {
          return <div key={todo?.id}>{todo?.title}</div>;
        })}
    </div>
  );
};

export default TodoList;
