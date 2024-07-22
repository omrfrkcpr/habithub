import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import useTaskCalls from "../../hooks/useTaskCalls";

const TaskCardSettingBtns = ({ taskId }: { taskId: string }) => {
  const { deleteTaskData } = useTaskCalls();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteTaskData("tasks", taskId);
  };

  return (
    <div>
      <button>
        <MdEdit className="w-4 h-4 md:w-5 md:h-5 pt-1 text-black/80 hover:text-orange-600" />
      </button>
      <button onClick={handleDeleteClick}>
        <RiDeleteBin6Fill className="w-4 h-4 md:w-5 md:h-5 pt-1 text-black/80 hover:text-red-600" />
      </button>
    </div>
  );
};

export default TaskCardSettingBtns;
