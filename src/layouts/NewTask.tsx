import { Switch } from "@mui/material";
import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewTask = () => {
  const initialNewTask: NewTask = {
    name: "",
    description: "",
    cardColor: "#ADF7B6",
    repeat: "",
    priority: "Low",
    dueDate: new Date(),
    tag: "",
    isCompleted: false,
  };

  const [newTask, setNewTask] = useState<NewTask>(initialNewTask);
  const [startDate, setStartDate] = useState(new Date());
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  // console.log(checked);

  const ExampleCustomInput = forwardRef<
    HTMLButtonElement,
    { value?: string; onClick?: () => void }
  >(({ value = "", onClick = () => {} }, ref) => (
    <button
      className="bg-habit-light-purple hover:bg-habit-light-purple/50 p-2 text-white rounded-lg"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));

  const cardColors = [
    "#ADF7B6",
    "#A817C0",
    "#FFC09F",
    "#B0FFFA",
    "#FCFF52",
    "#4EFF31",
    "#5BFFD8",
    "#0038FF",
    "#622BFF",
    "#D21DFF",
    "#B92350",
    "#FF0000",
    "#E9E3E8",
    "#554E55",
  ];

  return (
    <div className="h-[600px] mt-5 absolute w-full">
      <input
        type="text"
        placeholder="Name your new task"
        value={newTask.name}
        onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        className="bg-habit-light-gray w-full py-2 px-2 outline-none text-[16px] rounded-[8px] my-2"
      />
      <input
        type="text"
        placeholder="Describe your new task"
        value={newTask.description}
        onChange={(e) =>
          setNewTask({ ...newTask, description: e.target.value })
        }
        className="bg-habit-light-gray w-full py-2 px-2 outline-none text-[16px] rounded-[8px] mt-2 mb-5"
      />
      <div className="flex gap-2 items-center bg-habit-light-gray py-2 px-2 w-[fit-content] rounded-[8px]">
        <h3 className="text-black/70 font-semibold">Due Time:</h3>
        <DatePicker
          selected={startDate}
          onChange={(date: any) => setStartDate(date)}
          customInput={<ExampleCustomInput />}
          dateFormat="dd/MM/yyyy - h:mm aa"
          timeInputLabel="Time:"
          showTimeInput
        />
      </div>
      <div className="my-10">
        <h3 className="font-bold text-habit-gray dark:text-habit-white mb-3">
          Card Color
        </h3>
        <div className="flex flex-wrap gap-2 md:gap-4 ">
          {cardColors.map((color) => (
            <button
              key={color}
              style={{ backgroundColor: color }}
              className={`w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full cursor-pointer border-[1px] md:border-[3px] font-bold ${
                newTask.cardColor === color
                  ? "border-black/60 dark:border-[#EDEAEA]"
                  : "border-[#EDEAEA] dark:border-none"
              }`}
              onClick={() => setNewTask({ ...newTask, cardColor: color })}
            >
              {newTask.cardColor === color && "X"}
            </button>
          ))}
        </div>
        <div className="my-10 py-5 px-10 bg-habit-light-gray rounded-[8px] shadow-md flex justify-between gap-2">
          <div className="flex items-center mb-3 bg-white p-4 rounded-[8px] flex-1">
            <h3
              className={`font-bold ${
                checked ? "text-habit-gray" : "text-habit-gray/60"
              } `}
            >
              Repeat
            </h3>
            <Switch
              inputProps={{ "aria-label": "controlled" }}
              checked={checked}
              onChange={handleChange}
              color="secondary"
            />
          </div>
          <div className="p-4 rounded-[8px] bg-white flex flex-1">
            <h3 className="font-bold text-habit-gray mb-3 ">Priority</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTask;
