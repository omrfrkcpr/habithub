import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ActionBtn from "../buttons/ActionBtn";
import { resetNewTodo } from "../../features/newTodoSlice";
import { defaultOptions, deserify } from "@karmaniverous/serify-deserify";
import { RootState } from "../../app/store";

const ActionBtns: React.FC<ActionBtnsComp> = ({ setChecked }) => {
  const dispatch = useDispatch();
  const newTodo = useSelector((state: RootState) => state.newTodo);

  //! Dont forget to convert dueDates before creating a new todo
  console.log(deserify(newTodo.dueDates, defaultOptions));

  const handleResetNewTodo = () => {
    dispatch(resetNewTodo());
    setChecked(false);
  };
  const handleSaveNewTodo = () => {};

  return (
    <div className="flex gap-3 justify-center md:justify-center items-center md:me-10 pt-5 pb-10 md:py-10 md:w-[fit-content] md:ms-auto">
      <ActionBtn
        onClick={handleResetNewTodo}
        loading={false}
        icon={<RestartAltIcon sx={{ color: "white" }} />}
        label="Reset"
        color="orange"
      />
      <ActionBtn
        onClick={handleSaveNewTodo}
        loading={false}
        icon={<SaveIcon sx={{ color: "white" }} />}
        label="Save"
        color="green"
      />
    </div>
  );
};

export default ActionBtns;
