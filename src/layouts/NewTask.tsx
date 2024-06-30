import { Switch } from "@mui/material";
import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TagsInput } from "react-tag-input-component";

type ExampleCustomInputProps = {
  value?: string;
  onClick?: () => void;
};

const NewTask = () => {
  const initialNewTask = {
    name: "",
    description: "",
    cardColor: "#ADF7B6", // Default cardColor
    repeat: "no", // Default repeat value
    priority: "standard", // Default priority
    dueDate: new Date(), // Default time
    tag: "",
    isCompleted: false,
  };

  const [newTask, setNewTask] = useState(initialNewTask);
  const [startDate, setStartDate] = useState(new Date());
  const [checked, setChecked] = useState(false);
  const [availableTags] = useState([
    "Daily Routine",
    "Study Routine",
    "Work Routine",
  ]);

  const handleTagClick = (tag: string) => {
    setNewTask({ ...newTask, tag });
  };

  const handleTagRemove = () => {
    if (newTask.tag) {
      setNewTask({ ...newTask, tag: "" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const handlePriorityClick = (priority: string) => {
    setNewTask({ ...newTask, priority });
  };

  const ExampleCustomInput = forwardRef<
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
        className="bg-habit-light-gray w-full py-2 px-2 outline-none text-[12px] md:text-[16px] rounded-[8px] my-2"
      />
      <input
        type="text"
        placeholder="Describe your new task"
        value={newTask.description}
        onChange={(e) =>
          setNewTask({ ...newTask, description: e.target.value })
        }
        className="bg-habit-light-gray w-full py-2 px-2 outline-none text-[12px] md:text-[16px] rounded-[8px] mt-2 mb-5"
      />
      <div className="flex gap-2 items-center bg-habit-light-gray py-2 px-2 w-[fit-content] rounded-[8px]">
        <h3 className="text-black/70 text-[12px] md:text-[16px]">Due Time:</h3>
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
        <h3 className="font-bold text-habit-gray dark:text-habit-white mb-3 text-[12px] md:text-[16px]">
          Card Color
        </h3>
        <div className="flex flex-wrap gap-2 md:gap-4 ">
          {cardColors.map((color) => (
            <button
              key={color}
              style={{ backgroundColor: color }}
              className={`w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full text-xs md:text-[16px] cursor-pointer border-[1px] md:border-[3px] font-bold ${
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
        <div className="my-10 py-5 px-5 md:px-10 bg-habit-light-gray rounded-[8px] shadow-md flex justify-between flex-col md:flex-row gap-2">
          <div className="flex items-start mb-3 bg-white p-4 rounded-[8px] flex-1">
            <div className="flex justify-center items-center">
              <h3
                className={`font-semibold text-[12px] md:text-[16px] ${
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
          </div>
          <div className="p-4 rounded-[8px] bg-white flex flex-1 flex-col">
            <div className="border-b border-gray-300 mb-2 pb-2">
              <h3 className="font-semibold text-habit-gray mb-2 text-[12px] md:text-[16px]">
                Priority
              </h3>
              <p className="mb-3  font-light text-gray-500 text-[9px] md:text-[13px]">
                Priority helps you organize your tasks by importance. Select one
                of the priority levels below.
              </p>
              <div className="bg-gray-200 rounded-full mb-4 flex justify-evenly">
                <button
                  className={`capitalize flex-1 py-1 text-[12px] md:text-[16px] rounded-full ${
                    newTask.priority === "low"
                      ? "bg-gray-400 text-white"
                      : "hover:text-black/60 text-black"
                  }`}
                  onClick={() => handlePriorityClick("low")}
                >
                  low
                </button>
                <button
                  className={`capitalize flex-1 py-1 text-[12px] md:text-[16px] rounded-full ${
                    newTask.priority === "standard"
                      ? "bg-gray-400 text-white"
                      : "hover:text-black/60 text-black"
                  }`}
                  onClick={() => handlePriorityClick("standard")}
                >
                  standard
                </button>
                <button
                  className={`capitalize flex-1 py-1 text-[12px] md:text-[16px] rounded-full ${
                    newTask.priority === "high"
                      ? "bg-gray-400 text-white"
                      : "hover:text-black/60 text-black"
                  }`}
                  onClick={() => handlePriorityClick("high")}
                >
                  high
                </button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-habit-gray mb-1 text-[12px] md:text-[16px]">
                Tag
              </h3>
              <p className="mb-3  font-light text-gray-500 text-[9px] md:text-[13px]">
                Tags are important for keeping your to-do items in order.You can
                select a existing tag or write a new tag for your task. To
                successfully add new tag, please press Enter after typing.
              </p>
              <TagsInput
                value={newTask.tag ? [newTask.tag] : []}
                onChange={(tags) =>
                  setNewTask({ ...newTask, tag: tags[0] || "" })
                }
                name="tag"
                placeHolder={newTask.tag ? "✔️" : "Set a tag"}
                onRemoved={handleTagRemove}
                classNames={{ tag: "tag-cls", input: "input-cls" }}
              />
              <div className="flex flex-wrap gap-2 mt-4">
                {availableTags
                  .filter((tag) => tag !== newTask.tag)
                  .map((tag) => (
                    <button
                      key={tag}
                      className="bg-habit-light-gray hover:bg-gray-300 text-black text-[11px] md:text-[14px] py-[2px] px-2 rounded-lg cursor-pointer"
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTask;
