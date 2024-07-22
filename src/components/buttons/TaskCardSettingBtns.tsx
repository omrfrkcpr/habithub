import React from "react";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

const TaskCardSettingBtns = () => {
  return (
    <div>
      <button>
        <MdEdit className="w-4 h-4 md:w-5 md:h-5 pt-1 hover:text-orange-300" />
      </button>
      <button>
        <RiDeleteBin6Fill className="w-4 h-4 md:w-5 md:h-5 pt-1 hover:text-red-200" />
      </button>
    </div>
  );
};

export default TaskCardSettingBtns;
