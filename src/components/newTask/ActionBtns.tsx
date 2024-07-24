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
  const { tags } = useSelector((state: RootState) => state.task);
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { createTaskData } = useTaskCalls();
  const { date } = useSelector((state: RootState) => state.date);
  const { editTaskId } = useSelector((state: RootState) => state.task);

  // console.log(newTask);

  const handleResetNewTask = () => {
    dispatch(resetNewTask());
    setChecked(false);
  };

  const handleSaveNewTask = async () => {
    let editedTagId = "";
    // Mevcut tags listesinde eşleşen bir tag arayın
    const existingTag = tags.find(
      (tag: TagValues) => tag.name === newTask.tagId.name
    );

    if (existingTag) {
      editedTagId = existingTag?.id || "";
    } else {
      // Eşleşen bir tag yoksa, yeni bir tag oluşturun
      await createTaskData(
        "tags",
        {
          name: newTask.tagId,
          userId: currentUser?.id,
        },
        false
      );
      const createdTag = tags.find(
        (tag: TagValues) => tag.name === newTask.tagId.name
      );
      editedTagId = createdTag?.id || "";
    }

    // Check if dueDates is empty and if so, use the current date
    const updatedDueDates = newTask.dueDates.length ? newTask.dueDates : [date];

    //! Dont forget to convert dueDates before creating a new task
    // const deserializedDueDates = deserify(newTask.dueDates, defaultOptions);
    // console.log("Deserialized dueDates:", deserializedDueDates);

    const newTaskInfo = {
      ...newTask,
      tagId: editedTagId,
      dueDates: updatedDueDates,
      userId: currentUser?.id,
      // dueDates: deserializedDueDates,
    };

    createTaskData("tasks", newTaskInfo, true);

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
