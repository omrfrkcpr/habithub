import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import PriorityBtn from "../buttons/PriorityBtn";
import { priorities } from "../../helpers/constants";

const TagAndPriority: React.FC<ChildNewTask> = ({ newTask, setNewTask }) => {
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

  return (
    <div className="p-4 rounded-[8px] bg-white dark:bg-[#4b3455] flex flex-1 flex-col">
      <div className="border-b border-gray-300 mb-2 pb-2">
        <h3 className="font-semibold text-habit-gray dark:text-white/80 mb-2 text-[12px] md:text-[16px]">
          Priority
        </h3>
        <p className="mb-3 font-light text-gray-500 dark:text-white/70 text-[9px] md:text-[13px]">
          Priority helps you organize your tasks by importance. Select one of
          the priority levels below.
        </p>
        <div className="bg-gray-200 rounded-full mb-4 flex justify-evenly">
          {priorities.map((priority: string) => {
            return (
              <PriorityBtn
                key={priority}
                newTask={newTask}
                setNewTask={setNewTask}
                priority={priority}
              />
            );
          })}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-habit-gray dark:text-white/80 mb-1 text-[12px] md:text-[16px]">
          Tag
        </h3>
        <p className="mb-3 font-light text-gray-500 dark:text-white/70 text-[9px] md:text-[13px]">
          Tags are important for keeping your to-do items in order. You can
          select an existing tag or write a new tag for your task. To
          successfully add a new tag, please press Enter after typing.
        </p>
        <TagsInput
          value={newTask.tag ? [newTask.tag] : []}
          onChange={(tags) => setNewTask({ ...newTask, tag: tags[0] || "" })}
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
                className="bg-habit-light-gray dark:bg-[#977aa5] dark:hover:bg-gray-400 hover:bg-gray-300 text-black dark:text-white text-[11px] md:text-[14px] py-[2px] px-2 rounded-lg cursor-pointer"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TagAndPriority;
