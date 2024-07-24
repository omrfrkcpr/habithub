import React from "react";

const RepeatValueBtn: React.FC<RepeatValueBtnProps> = ({
  value,
  label,
  selectedValue,
  onClick,
  isDisabled,
}) => {
  const isSelected = Array.isArray(selectedValue)
    ? selectedValue.includes(value)
    : selectedValue === value;

  return (
    <button
      value={value}
      disabled={isDisabled}
      onClick={() => !isDisabled && onClick(value)}
      className={`text-xs md:text-sm py-1 px-1 rounded-md border border-gray-200 dark:border-gray-600 ${
        isDisabled ? "opacity-50 cursor-not-allowed line-through" : ""
      } ${
        isSelected
          ? "bg-habit-light-purple text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      {label}
    </button>
  );
};

export default RepeatValueBtn;
