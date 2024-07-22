import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CardColor from "../components/newTask/CardColor";
import Repeat from "../components/newTask/Repeat";
import TagAndPriority from "../components/newTask/TagAndPriority";
import ActionBtns from "../components/newTask/ActionBtns";
import ExampleCustomInput from "../components/inputs/ExampleCustumInput";
import { RootState } from "../app/store";
import { setNewTask } from "../features/newTaskSlice";

const NewTask = ({ editTaskId }: { editTaskId?: string }) => {
  const newTask = useSelector((state: RootState) => state.newTask);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const updatedDueDates = [date.toISOString(), ...newTask.dueDates]; // Add new date to the beginning
      dispatch(setNewTask({ ...newTask, dueDates: updatedDueDates }));
      setStartDate(date); // Update startDate to the selected date
    }
  };

  // console.log(newTask);

  return (
    <div className={`mt-5 ${editTaskId ? "" : "absolute"}`}>
      {editTaskId && (
        <label
          htmlFor="name"
          className="font-bold text-habit-gray dark:text-habit-white text-[11px] md:text-[15px]"
        >
          Name
        </label>
      )}
      <input
        type="text"
        placeholder="Name your new task"
        value={newTask.name}
        onChange={(e) =>
          dispatch(setNewTask({ ...newTask, name: e.target.value }))
        }
        className={`bg-habit-light-gray dark:bg-[#5e436c] placeholder:dark:text-white/80 w-full py-2 px-2 outline-none ${
          editTaskId
            ? "text-[10px] md:text-[14px]"
            : "text-[12px] md:text-[16px]"
        }  rounded-[8px] my-2`}
      />
      {editTaskId && (
        <label
          htmlFor="description"
          className="font-bold text-habit-gray dark:text-habit-white text-[11px] md:text-[15px]"
        >
          Description
        </label>
      )}
      <input
        type="text"
        id="description"
        placeholder="Describe your new task"
        value={newTask.description}
        onChange={(e) =>
          dispatch(setNewTask({ ...newTask, description: e.target.value }))
        }
        className={`bg-habit-light-gray dark:bg-[#5e436c] placeholder:dark:text-white/80 w-full py-2 px-2 outline-none ${
          editTaskId
            ? "text-[10px] md:text-[14px]"
            : "text-[12px] md:text-[16px]"
        }  rounded-[8px] mt-2 mb-5`}
      />
      <CardColor editTaskId={editTaskId} />
      <div className={`${editTaskId ? "my-5" : "my-10"}`}>
        <div className="flex gap-2 items-center bg-habit-light-gray dark:bg-[#5e436c] py-2 px-2 w-[fit-content] rounded-[8px]">
          <h3 className="text-black/60 dark:text-white/80 text-[12px] md:text-[16px]">
            Due Time:
          </h3>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            customInput={<ExampleCustomInput />}
            dateFormat="dd/MM/yyyy - h:mm aa"
            timeInputLabel="Time:"
            showTimeInput
            minDate={new Date()}
          />
        </div>
        <div
          className={`${
            editTaskId ? "my-3" : "my-5 py-5 px-5 shadow-md"
          } bg-habit-light-gray dark:bg-[#5e436c] rounded-[8px] flex justify-between flex-col lg:flex-row gap-4`}
        >
          {!editTaskId && (
            <Repeat
              startDate={startDate}
              checked={checked}
              setChecked={setChecked}
            />
          )}
          <TagAndPriority editTaskId={editTaskId} />
        </div>
      </div>
      <ActionBtns setChecked={setChecked} editTaskId={editTaskId} />
    </div>
  );
};

export default NewTask;
