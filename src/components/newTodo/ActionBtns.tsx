import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ActionBtn from "../buttons/ActionBtn";
import { resetNewTodo } from "../../features/newTodoSlice";
import { defaultOptions, deserify } from "@karmaniverous/serify-deserify";
import { RootState } from "../../app/store";
import useTodoCalls from "../../hooks/useTodoCalls";
import { setNewTodo } from "../../features/newTodoSlice";

const ActionBtns: React.FC<ActionBtnsComp> = ({ setChecked }) => {
  const dispatch = useDispatch();
  const newTodo = useSelector((state: RootState) => state.newTodo);
  const { tags } = useSelector((state: RootState) => state.todo);
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { createTodoData } = useTodoCalls();
  const { date } = useSelector((state: RootState) => state.date);

  //! Dont forget to convert dueDates before creating a new todo
  console.log(deserify(newTodo.dueDates, defaultOptions));

  const handleResetNewTodo = () => {
    dispatch(resetNewTodo());
    setChecked(false);
  };
  const handleSaveNewTodo = async () => {
    let editedTagId = "";
    // Mevcut tags listesinde eşleşen bir tag arayın
    const existingTag = tags.find(
      (tag: TagValues) => tag.name === newTodo.tagId
    );

    if (existingTag) {
      editedTagId = existingTag?.id || "";
    } else {
      // Eşleşen bir tag yoksa, yeni bir tag oluşturun
      await createTodoData("tags", {
        name: newTodo.tagId,
        userId: currentUser?.id,
      });
      const createdTag = tags.find(
        (tag: TagValues) => tag.name === newTodo.tagId
      );
      editedTagId = createdTag?.id || "";
    }

    if (!newTodo.dueDates.length) {
      dispatch(setNewTodo({ ...newTodo, dueDates: [date] }));
    }

    const newTodoInfo = {
      ...newTodo,
      tagId: editedTagId,
      dueDates: deserify(newTodo.dueDates, defaultOptions),
      userId: currentUser?.id,
    };

    createTodoData("todos", newTodoInfo);

    handleResetNewTodo();
  };

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
