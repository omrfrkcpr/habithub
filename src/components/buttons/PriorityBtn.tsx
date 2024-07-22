import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { setNewTask } from "../../features/newTaskSlice";

const PriorityBtn: React.FC<PriorityBtn> = ({ priority }) => {
  const newTask = useSelector((state: RootState) => state.newTask);
  const dispatch = useDispatch();

  const { value, label } = priority;

  const handlePriorityClick = (value: number) => {
    dispatch(setNewTask({ ...newTask, priority: value }));
  };

  return (
    <button
      className={`capitalize flex-1 py-1 text-[12px] md:text-[15px] rounded-full ${
        newTask.priority === value
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
