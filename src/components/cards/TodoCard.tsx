import React, { useEffect, useState, useRef } from "react";
import useTodoCalls from "../../hooks/useTodoCalls";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const TodoCard: React.FC<TodoCardProps> = ({ todo, showDesc, setShowDesc }) => {
  // console.log(todo);
  const { updateTodoData } = useTodoCalls();
  const { id, name, cardColor, priority, isCompleted, description, tagId } =
    todo;
  const [isDone, setIsDone] = useState<boolean>();
  const descRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    setIsDone(isCompleted);
  }, [isCompleted]);

  const handleCompleteTodoClick = async (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (descRef.current && descRef.current.contains(e.target as Node)) {
      // Description span clicked, do nothing
      return;
    }

    // setIsDone((prevState) => !prevState);
    updateTodoData("todos", id, { isCompleted: !isDone });
  };

  const handleShowDescClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent handleCompleteTodoClick from being triggered
    if (showDesc !== id) {
      setShowDesc(id);
    } else {
      setShowDesc("");
    }
  };

  return (
    <div
      className={`py-2 px-2 rounded-md relative cursor-pointer`}
      style={{ backgroundColor: cardColor }}
      onClick={handleCompleteTodoClick}
    >
      <div className="me-8">
        <input
          type="checkbox"
          className="me-2 cursor-pointer"
          checked={isDone}
          readOnly
        />
        <span
          className={`${
            isDone && "line-through text-black/30"
          } text-[12px] md:text-[16px] font-semibold`}
        >
          {name}
        </span>
        <button
          onClick={handleShowDescClick}
          className="absolute right-3 top-3 cursor-pointer hover:text-black/60"
        >
          {showDesc === id ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
      </div>
      <div
        className={`ms-[20px] transition-all duration-500 ease-in-out transform origin-top overflow-hidden text-[10px] md:text-[14px] ${
          isDone && "line-through text-black/30"
        } ${showDesc === id ? "max-h-auto opacity-100" : "max-h-0 opacity-0"}`}
      >
        <span ref={descRef}>{description}</span>
      </div>
    </div>
  );
};

export default TodoCard;
