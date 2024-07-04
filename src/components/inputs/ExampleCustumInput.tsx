import React, { forwardRef } from "react";

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

export default ExampleCustomInput;
