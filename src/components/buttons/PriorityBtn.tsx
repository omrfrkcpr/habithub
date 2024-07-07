import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { setNewTodo } from "../../features/newTodoSlice";

const PriorityBtn: React.FC<PriorityBtn> = ({ priority }) => {
  const newTodo = useSelector((state: RootState) => state.newTodo);
  const dispatch = useDispatch();
  const { value, label } = priority;
  const handlePriorityClick = (value: number) => {
    dispatch(setNewTodo({ ...newTodo, priority: value }));
  };

  return (
    <button
      className={`capitalize flex-1 py-1 text-[12px] md:text-[16px] rounded-full ${
        newTodo.priority === value
          ? "bg-gray-400 text-white"
          : "hover:text-black/60 text-black"
      }`}
      onClick={() => handlePriorityClick(value)}
    >
      {label}
    </button>
  );
};

export default PriorityBtn;
