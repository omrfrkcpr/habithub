import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import useTaskCalls from "../../hooks/useTaskCalls";
import Modal from "../commons/Modal";

const TaskCardSettingBtns = ({ taskId }: { taskId: string }) => {
  const { deleteTaskData } = useTaskCalls();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteTaskData("tasks", taskId);
  };

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowEditModal(true);
  };

  const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowEditModal(false);
  };

  return (
    <>
      <div>
        <button onClick={handleEditClick}>
          <MdEdit className="w-4 h-4 md:w-5 md:h-5 pt-1 text-black/80 hover:text-orange-600" />
        </button>
        <button onClick={handleDeleteClick}>
          <RiDeleteBin6Fill className="w-4 h-4 md:w-5 md:h-5 pt-1 text-black/80 hover:text-red-600" />
        </button>
      </div>
      {showEditModal && (
        <Modal isOpen={showEditModal} onClose={closeModal}>
          <div>Hey</div>
        </Modal>
      )}
    </>
  );
};

export default TaskCardSettingBtns;
