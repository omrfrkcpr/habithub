import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ActionBtn from "../buttons/ActionBtn";
import { resetNewTask } from "../../features/newTaskSlice";
// import { defaultOptions, deserify } from "@karmaniverous/serify-deserify";
import { RootState } from "../../app/store";
import useTaskCalls from "../../hooks/useTaskCalls";

const ActionBtns: React.FC<ActionBtnsComp> = ({ setChecked }) => {
  const dispatch = useDispatch();
  const newTask = useSelector((state: RootState) => state.newTask);
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { createTaskData, updateTaskData } = useTaskCalls();
  const { date } = useSelector((state: RootState) => state.date);
  const { editTaskId } = useSelector((state: RootState) => state.task);

  console.log(newTask);

  const handleResetNewTask = () => {
    dispatch(resetNewTask());
    setChecked(false);
  };

  const handleSaveNewTask = async () => {
    // Check if dueDates is empty and if so, use the current date
    const updatedDueDates = newTask.dueDates.length ? newTask.dueDates : [date];

    let newTaskInfo: any = {
      ...newTask,
      dueDates: updatedDueDates,
      userId: currentUser?.id,
      tagId: newTask.tagId.id || newTask.tagId.name, // if user wanna chose a new tag, we provide name instead of id so that backend can handle it.
    };

    if (editTaskId) {
      // Update Task
      newTaskInfo = {
        ...newTaskInfo,
        date,
      };
      await updateTaskData("tasks", editTaskId, newTaskInfo);
    } else {
      // Create Task
      await createTaskData("tasks", newTaskInfo, true);
    }

    handleResetNewTask();
  };

  return (
    <div
      className={`flex justify-center items-center ${
        editTaskId ? "mx-auto" : "gap-3 pt-5 pb-10 md:py-10 md:me-10 md:ms-auto"
      }  md:w-[fit-content] `}
    >
      {!editTaskId && (
        <ActionBtn
          onClick={handleResetNewTask}
          loading={false}
          icon={<RestartAltIcon sx={{ color: "white" }} />}
          label="Reset"
          color="orange"
          edit={editTaskId ? true : false}
        />
      )}
      <ActionBtn
        onClick={handleSaveNewTask}
        loading={false}
        icon={<SaveIcon sx={{ color: "white" }} />}
        label="Save"
        color="green"
        edit={editTaskId ? true : false}
      />
    </div>
  );
};

export default ActionBtns;
