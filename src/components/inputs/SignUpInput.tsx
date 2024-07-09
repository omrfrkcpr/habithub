import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import PasswordStrengthBar from "react-password-strength-bar";

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
  onFocus,
  password,
}) => {
  return (
    <div
      className="w-[90%] md:w-[50%] mx-auto text-left relative"
      onClick={onFocus}
    >
      <input
        type={type}
        name={name}
        id={
          name === "password"
            ? "hs-strong-password-api-with-indicator-and-hint-in-popover"
            : ""
        }
        disabled={name === "confirmPassword" && !password}
        onFocus={onFocus}
        autoComplete="off"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full mx-auto text-[10px] md:text-[13px] placeholder:font-light outline-none ${
          name === "confirmPassword" ? "mt-2" : "mt-7"
        } py-2 px-3 rounded-lg`}
        aria-describedby={`${name}Error`}
      />
      {name === "password" && (
        <PasswordStrengthBar
          password={value}
          minLength={6}
          // shortScoreWord={false}
          // scoreWords={[]}
          scoreWordStyle={{ fontSize: "10px" }}
        />
      )}
      {touched && error && (
        <div
          id={`${name}Error`}
          className={`absolute z-40 text-red-600 text-[10px] ${
            name === "password" ? "-mt-4" : "mt-[5px]"
          } text-left ms-1`}
          aria-live="assertive"
        >
          {error}
        </div>
      )}
      {showToggle && onToggleShowPassword && (
        <div
          onClick={onToggleShowPassword}
          className={`absolute right-4  ${
            name === "password" ? "top-10 md:top-10" : "top-4 md:top-5"
          } text-gray-600 cursor-pointer`}
        >
          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
        </div>
      )}
    </div>
  );
};

export default SignUpInput;
