import React, { forwardRef } from "react";
// import { RootState } from "../../app/store";
// import { useSelector } from "react-redux";

const ExampleCustomInput = forwardRef<
  HTMLButtonElement,
  ExampleCustomInputProps
>(({ value = "", onClick = () => {} }, ref) => {
  // const { editTaskId } = useSelector((state: RootState) => state.task);
  return (
    <button
      className="bg-[#C67ED2] hover:bg-[#CA87F4] dark:bg-[#2a1733] dark:hover:bg-[#2a1733]/50 text-sm md:text-md p-1 md:p-2 text-white rounded-lg"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  );
});

export default ExampleCustomInput;
