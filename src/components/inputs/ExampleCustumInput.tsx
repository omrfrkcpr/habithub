import React, { forwardRef } from "react";

const ExampleCustomInput = forwardRef<
  HTMLButtonElement,
  ExampleCustomInputProps
>(({ value = "", onClick = () => {} }, ref) => (
  <button
    className="bg-[#2a1733] hover:bg-[#2a1733]/50 text-sm md:text-md p-1 md:p-2 text-white rounded-lg"
    onClick={onClick}
    ref={ref}
  >
    {value}
  </button>
));

export default ExampleCustomInput;
