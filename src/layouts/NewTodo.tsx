import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CardColor from "../components/newTodo/CardColor";
import Repeat from "../components/newTodo/Repeat";
import TagAndPriority from "../components/newTodo/TagAndPriority";
import ActionBtns from "../components/newTodo/ActionBtns";

const NewTodo = () => {
  const initialNewTodo: NewTodo = {
    name: "",
    description: "",
    cardColor: "#ADF7B6",
    repeat: "daily",
    priority: "standard",
    dueDates: [],
    tag: "",
    isCompleted: false,
  };

  const [newTodo, setNewTodo] = useState<NewTodo>(initialNewTodo);
  const [startDate, setStartDate] = useState(new Date());

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const updatedDueDates = [date, ...newTodo.dueDates]; // Add new date to the beginning
      setNewTodo({ ...newTodo, dueDates: updatedDueDates });
      setStartDate(date); // Update startDate to the selected date
    }
  };

  console.log(newTodo);

  return (
    <div className="mt-5 absolute">
      <input
        type="text"
        placeholder="Name your new task"
        value={newTodo.name}
        onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
        className="bg-habit-light-gray dark:bg-[#5e436c] placeholder:dark:text-white/80 w-full py-2 px-2 outline-none text-[12px] md:text-[16px] rounded-[8px] my-2"
      />
      <input
        type="text"
        placeholder="Describe your new task"
        value={newTodo.description}
        onChange={(e) =>
          setNewTodo({ ...newTodo, description: e.target.value })
        }
        className="bg-habit-light-gray dark:bg-[#5e436c] placeholder:dark:text-white/80 w-full py-2 px-2 outline-none text-[12px] md:text-[16px] rounded-[8px] mt-2 mb-5"
      />
      <CardColor newTodo={newTodo} setNewTodo={setNewTodo} />
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
            newTodo={newTodo}
            setNewTodo={setNewTodo}
            startDate={startDate}
          />
          <TagAndPriority newTodo={newTodo} setNewTodo={setNewTodo} />
        </div>
      </div>
      <ActionBtns newTodo={newTodo} setNewTodo={setNewTodo} />
    </div>
  );
};

export default NewTodo;

export const ExampleCustomInput = forwardRef<
  HTMLButtonElement,
  ExampleCustomInputProps
>(({ value = "", onClick = () => {} }, ref) => (
  <button
    className="bg-habit-light-purple hover:bg-habit-light-purple/50 text-sm md:text-md p-1 md:p-2 text-white rounded-lg"
    onClick={onClick}
    ref={ref}
  >
    {value}
  </button>
));
