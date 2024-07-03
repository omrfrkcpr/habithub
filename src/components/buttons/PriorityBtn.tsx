import React from "react";

const PriorityBtn: React.FC<PriorityBtn> = ({
  newTodo,
  setNewTodo,
  priority,
}) => {
  const handlePriorityClick = (priority: string) => {
    setNewTodo({ ...newTodo, priority });
  };

  return (
    <button
      className={`capitalize flex-1 py-1 text-[12px] md:text-[16px] rounded-full ${
        newTodo.priority === priority
          ? "bg-gray-400 text-white"
          : "hover:text-black/60 text-black"
      }`}
      onClick={() => handlePriorityClick(priority)}
    >
      {priority}
    </button>
  );
};

export default PriorityBtn;
