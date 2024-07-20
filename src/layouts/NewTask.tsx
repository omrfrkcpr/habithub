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

const NewTask = () => {
  const newTask = useSelector((state: RootState) => state.newTask);
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(new Date());
  const [checked, setChecked] = useState(false);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const updatedDueDates = [date.toISOString(), ...newTask.dueDates]; // Add new date to the beginning
      dispatch(setNewTask({ ...newTask, dueDates: updatedDueDates }));
      setStartDate(date); // Update startDate to the selected date
    }
  };

  console.log(newTask);

  return (
    <div className="mt-5 absolute">
      <input
        type="text"
        placeholder="Name your new task"
        value={newTask.name}
        onChange={(e) =>
          dispatch(setNewTask({ ...newTask, name: e.target.value }))
        }
        className="bg-habit-light-gray dark:bg-[#5e436c] placeholder:dark:text-white/80 w-full py-2 px-2 outline-none text-[12px] md:text-[16px] rounded-[8px] my-2"
      />
      <input
        type="text"
        placeholder="Describe your new task"
        value={newTask.description}
        onChange={(e) =>
          dispatch(setNewTask({ ...newTask, description: e.target.value }))
        }
        className="bg-habit-light-gray dark:bg-[#5e436c] placeholder:dark:text-white/80 w-full py-2 px-2 outline-none text-[12px] md:text-[16px] rounded-[8px] mt-2 mb-5"
      />
      <CardColor />
      <div className="my-10">
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
        <div className="my-5 py-5 px-5 bg-habit-light-gray dark:bg-[#5e436c] rounded-[8px] shadow-md flex justify-between flex-col lg:flex-row gap-4">
          <Repeat
            startDate={startDate}
            checked={checked}
            setChecked={setChecked}
          />
          <TagAndPriority />
        </div>
      </div>
      <ActionBtns setChecked={setChecked} />
    </div>
  );
};

export default NewTask;
