import React from "react";

const PriorityBtn: React.FC<PriorityBtn> = ({
  newTask,
  setNewTask,
  priority,
}) => {
  const handlePriorityClick = (priority: string) => {
    setNewTask({ ...newTask, priority });
  };

  return (
    <button
      className={`capitalize flex-1 py-1 text-[12px] md:text-[16px] rounded-full ${
        newTask.priority === priority
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
