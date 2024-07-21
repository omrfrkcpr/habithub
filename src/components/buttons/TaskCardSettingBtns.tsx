import React from "react";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

const TaskCardSettingBtns = () => {
  return (
    <div className="space-x-1">
      <button>
        <MdEdit className="w-3 h-3 md:w-5 md:h-5 pt-1 hover:text-orange-300" />
      </button>
      <button>
        <RiDeleteBin6Fill className="w-3 h-3 md:w-5 md:h-5 pt-1 hover:text-red-200" />
      </button>
    </div>
  );
};

export default TaskCardSettingBtns;
