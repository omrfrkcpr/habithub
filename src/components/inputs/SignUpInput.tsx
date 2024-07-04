import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const SignUpInput: React.FC<SignUpInputProps> = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
  touched,
  showToggle,
  showPassword,
  onToggleShowPassword,
}) => {
  return (
    <div className="w-[90%] md:w-[50%] mx-auto text-left relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full mx-auto text-[10px] md:text-[13px] placeholder:font-light outline-none mt-4 py-2 px-3 rounded-lg "
        aria-describedby={`${name}Error`}
      />
      {touched && error && (
        <div
          id={`${name}Error`}
          className="text-red-600 text-[10px] mt-[10px] md:text-[13px] text-left ms-1"
          aria-live="assertive"
        >
          {error}
        </div>
      )}
      {showToggle && onToggleShowPassword && (
        <div
          onClick={onToggleShowPassword}
          className="absolute right-4 top-6 md:top-7 text-gray-600 cursor-pointer"
        >
          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
        </div>
      )}
    </div>
  );
};

export default SignUpInput;
