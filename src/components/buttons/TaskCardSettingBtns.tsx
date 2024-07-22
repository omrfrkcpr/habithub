import React from "react";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import useTaskCalls from "../../hooks/useTaskCalls";
import { useLocation, useNavigate } from "react-router-dom";

const TaskCardSettingBtns = ({ taskId }: { taskId: string }) => {
  const { deleteTaskData } = useTaskCalls();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteTaskData("tasks", taskId);
  };

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`/home/${taskId}`, { state: { backgroundLocation: location } });
  };

  return (
    <div>
      <button onClick={handleEditClick}>
        <MdEdit className="w-4 h-4 md:w-5 md:h-5 pt-1 text-black/80 hover:text-orange-600" />
      </button>
      <button onClick={handleDeleteClick}>
        <RiDeleteBin6Fill className="w-4 h-4 md:w-5 md:h-5 pt-1 text-black/80 hover:text-red-600" />
      </button>
    </div>
  );
};

export default TaskCardSettingBtns;
