import { useSelector, useDispatch } from "react-redux";
import { TagsInput } from "react-tag-input-component";
import PriorityBtn from "../buttons/PriorityBtn";
import { priorities } from "../../helpers/constants";
import { setNewTask } from "../../features/newTaskSlice";
import { RootState } from "../../app/store";

const TagAndPriority = () => {
  const newTask = useSelector((state: RootState) => state.newTask);
  const dispatch = useDispatch();
  const { tags } = useSelector((state: RootState) => state.task);
  const { editTaskId } = useSelector((state: RootState) => state.task);

  const handleTagClick = (targetTagName: string) => {
    dispatch(setNewTask({ ...newTask, tagName: targetTagName }));
  };

  const handleTagRemove = () => {
    if (newTask.tagName) {
      dispatch(setNewTask({ ...newTask, tagName: "" }));
    }
  };

  return (
    <div
      className={`${
        editTaskId ? "p-3 bg-habit-light-gray" : "p-4 bg-white"
      }  rounded-[8px]  dark:bg-[#2a1733] flex flex-1 flex-col`}
    >
      <div className="border-b border-gray-300 mb-2 pb-2">
        <h3 className="font-semibold text-habit-gray dark:text-white mb-2 text-[12px] md:text-[16px]">
          Priority
        </h3>
        {!editTaskId && (
          <p className="mb-3 font-light text-gray-500 dark:text-white/90 text-[9px] md:text-[13px]">
            Priority helps you organize your tasks by importance. Select one of
            the priority levels below.
          </p>
        )}
        <div className="bg-gray-200 rounded-full mb-4 flex justify-evenly">
          {priorities.map((priority: Priorities) => {
            return <PriorityBtn key={priority?.value} priority={priority} />;
          })}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-habit-gray dark:text-white mb-1 text-[12px] md:text-[16px]">
          Tag
        </h3>
        {!editTaskId && (
          <p className="mb-3 font-light text-gray-500 dark:text-white/90 text-[9px] md:text-[13px]">
            Tags are important for keeping your to-do items in order. You can
            select an existing tag or write a new tag for your task. To
            successfully add a new tag, please press Enter after typing.
          </p>
        )}
        <TagsInput
          value={newTask.tagName ? [newTask.tagName] : []}
          onChange={(tags) => {
            if (tags.length > 0) {
              const newTagName = tags[0];
              dispatch(setNewTask({ ...newTask, tagName: newTagName }));
            } else {
              handleTagRemove();
            }
          }}
          name="tag"
          placeHolder={newTask.tagName ? "✔️" : "Set a tag"}
          onRemoved={handleTagRemove}
          classNames={{ tag: "tag-cls", input: "input-cls" }}
        />
        <div className="flex flex-wrap gap-2 mt-4">
          {tags
            .filter((tag: TagValues) => tag.name !== newTask.tagName)
            .slice(0, 3)
            .map(({ name }) => (
              <button
                key={name}
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
