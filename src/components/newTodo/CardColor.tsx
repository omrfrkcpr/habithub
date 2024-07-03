import React from "react";
import { cardColors } from "../../helpers/constants";

const CardColor: React.FC<ChildNewTodo> = ({ newTodo, setNewTodo }) => {
  const handleCardColorClick = (color: string) => {
    setNewTodo({ ...newTodo, cardColor: color });
  };

  return (
    <div>
      <h3 className="font-bold text-habit-gray dark:text-habit-white mb-3 text-[12px] md:text-[16px]">
        Card Color
      </h3>
      <div className="flex flex-wrap gap-2 md:gap-4">
        {cardColors.map((color: string) => (
          <button
            key={color}
            style={{ backgroundColor: color }}
            className={`w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full text-xs md:text-[16px] cursor-pointer border-[1px] md:border-[3px] font-bold ${
              newTodo.cardColor === color
                ? "border-black/60 dark:border-[#EDEAEA]"
                : "border-[#EDEAEA] dark:border-none"
            }`}
            onClick={() => handleCardColorClick(color)}
          >
            {newTodo.cardColor === color && "X"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CardColor;
