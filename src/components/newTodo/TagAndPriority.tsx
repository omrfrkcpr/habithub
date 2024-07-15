// import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TagsInput } from "react-tag-input-component";
import PriorityBtn from "../buttons/PriorityBtn";
import { priorities } from "../../helpers/constants";
import { setNewTodo } from "../../features/newTodoSlice";
import { RootState } from "../../app/store";

const TagAndPriority = () => {
  const newTodo = useSelector((state: RootState) => state.newTodo);
  const { tags } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();

  // const [availableTags] = useState([
  //   "Daily Routine",
  //   "Study Routine",
  //   "Work Routine",
  // ]);

  // console.log(tags);

  const handleTagClick = (tagName: string) => {
    dispatch(setNewTodo({ ...newTodo, tagId: tagName }));
  };

  const handleTagRemove = () => {
    if (newTodo.tagId) {
      dispatch(setNewTodo({ ...newTodo, tagId: "" }));
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
          {priorities.map((priority: Priorities) => {
            return <PriorityBtn key={priority?.value} priority={priority} />;
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
          value={newTodo.tagId ? [newTodo.tagId] : []}
          onChange={(tags) => {
            if (tags.length > 0) {
              dispatch(setNewTodo({ ...newTodo, tagId: tags[0] }));
            }
          }}
          name="tag"
          placeHolder={newTodo.tagId ? "✔️" : "Set a tag"}
          onRemoved={handleTagRemove}
          classNames={{ tag: "tag-cls", input: "input-cls" }}
        />
        <div className="flex flex-wrap gap-2 mt-4">
          {tags
            .filter((tag: TagValues) => (tag.name || tag.id) !== newTodo.tagId)
            .map(({ name, id }) => (
              <button
                key={id}
                className="bg-habit-light-gray dark:bg-[#977aa5] dark:hover:bg-gray-400 hover:bg-gray-300 text-black dark:text-white text-[11px] md:text-[14px] py-[2px] px-2 rounded-lg cursor-pointer"
                onClick={() => handleTagClick(name)}
              >
                {name}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TagAndPriority;
