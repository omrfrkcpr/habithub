import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ActionBtn from "../buttons/ActionBtn";

const ActionBtns: React.FC<ChildNewTodo> = ({ newTodo, setNewTodo }) => {
  const handleResetNewTodo = () => {};
  const handleSaveNewTodo = () => {};

  return (
    <div className="flex gap-3 justify-center md:justify-center items-center md:me-10 pt-5 pb-10 md:py-10 md:w-[fit-content] md:ms-auto">
      <ActionBtn
        onClick={handleResetNewTodo}
        loading={false}
        icon={<RestartAltIcon sx={{ color: "white" }} />}
        label="Reset"
        color="bg-orange-600"
        hoverColor="bg-orange-500"
      />
      <ActionBtn
        onClick={handleSaveNewTodo}
        loading={false}
        icon={<SaveIcon sx={{ color: "white" }} />}
        label="Save"
        color="bg-green-600"
        hoverColor="bg-green-500"
      />
    </div>
  );
};

export default ActionBtns;
