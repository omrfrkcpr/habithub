import React from "react";
import RepeatValueBtn from "../buttons/RepeatValueBtn";

const RepeatSection: React.FC<RepeatSectionProps> = ({
  options,
  selectedValue,
  onClick,
}) => {
  return (
    <div className="mt-3 flex gap-2 flex-wrap">
      {options.map(({ value, label, isDisabled }) => (
        <RepeatValueBtn
          key={value}
          value={value}
          label={label}
          selectedValue={selectedValue}
          onClick={onClick}
          isDisabled={isDisabled}
        />
      ))}
    </div>
  );
};

export default RepeatSection;
