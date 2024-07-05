import React from "react";

const PriorityBtn: React.FC<PriorityBtn> = ({
  newTodo,
  setNewTodo,
  priority,
}) => {
  const { value, label } = priority;
  const handlePriorityClick = (value: number) => {
    setNewTodo({ ...newTodo, priority: value });
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
