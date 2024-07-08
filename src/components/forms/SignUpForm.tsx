import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthBtns from "../buttons/AuthBtns";
import { useNavigate } from "react-router-dom";
import line from "../../assets/straight-line.png";
import SignUpInput from "../inputs/SignUpInput";
import PasswordCheckList from "../inputs/PasswordCheckList";

export const passwordValidation = Yup.string()
  .min(6, "Password must be at least 6 characters")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/\d/, "Password must contain at least one number")
  .matches(
    /[!@#$%]/,
    "Password must contain at least one special character (@,!,#,$,%)"
  );

export const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Please provide your firstname")
    .min(3, "Firstname must be at least 2 characters")
    .max(20, "Firstname should not contain more than 20 characters"),
  lastName: Yup.string()
    .required("Please provide your lastname")
    .min(3, "Lastname must be at least 2 characters")
    .max(20, "Lastname should not contain more than 20 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: passwordValidation.required("Password is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  ),
});

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showChecklist, setShowChecklist] = useState<boolean>(false);
  const checklistRef = useRef<HTMLDivElement>(null);

  // Close the checklist when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        checklistRef.current &&
        !(checklistRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setShowChecklist(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [checklistRef]);

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      console.log(values);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const inputFields = [
    {
      type: "text",
      name: "firstName",
      placeholder: "Firstname",
      showToggle: false,
    },
    {
      type: "text",
      name: "lastName",
      placeholder: "Lastname",
      showToggle: false,
    },
    {
      type: "text",
      name: "email",
      placeholder: "Email",
      showToggle: false,
    },
    {
      type: showPass ? "text" : "password",
      name: "password",
      placeholder: "Password",
      showToggle: true,
      showPassword: showPass,
      onToggleShowPassword: () => setShowPass((prevState) => !prevState),
    },
    {
      type: showConfirmPass ? "text" : "password",
      name: "confirmPassword",
      placeholder: "Confirm Password",
      showToggle: true,
      showPassword: showConfirmPass,
      onToggleShowPassword: () => setShowConfirmPass((prevState) => !prevState),
    },
  ];

  return (
    <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[90%] md:w-[80%] lg:w-[60%] h-auto max-w-[750px] max-h-[fit-content] xl:h-[615px] bg-[#f8f9fadb] shadow-md rounded-lg py-6 px-2 mt-[28px] md:mt-[35px] text-center flex flex-col justify-between">
      <h3 className="text-habit-light-purple font-bold text-center text-[15px] md:text-[20px] mt-4">
        Get started with your account
      </h3>
      <p className="w-[70%] mx-auto text-[10px] md:text-[12px] font-light text-center">
        Track your habits. Achieve your goals. Do it all with HabitHub's Todo
        Management Platform. Already have an account?{" "}
        <span
          onClick={() => navigate("/signin")}
          className="text-blue-400 font-semibold hover:underline cursor-pointer"
        >
          Log in
        </span>
      </p>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col justify-center items-center relative"
      >
        {inputFields.map((field: SignUpInputFields, index: number) => (
          <SignUpInput
            key={index}
            type={field.type}
            name={field.name}
            value={(formik.values as any)[field.name]}
            onChange={formik.handleChange}
            placeholder={field.placeholder}
            error={(formik.errors as any)[field.name]}
            touched={(formik.touched as any)[field.name]}
            showToggle={field.showToggle}
            showPassword={field.showPassword}
            onToggleShowPassword={field.onToggleShowPassword}
            onFocus={() => {
              field.type === "password" && setShowChecklist(true);
            }}
          />
        ))}
        {showChecklist && (
          <div
            ref={checklistRef}
            className="bg-gray-100 w-[310px] md:w-[380px] text-left z-50 absolute top-2 md:top-5 shadow-md "
          >
            <PasswordCheckList
              password={formik.values.password}
              confirmPassword={formik.values.confirmPassword}
              setShowChecklist={setShowChecklist}
            />
          </div>
        )}
        <p className="text-[10px] font-light mt-5 w-[80%] max-w-[400px]">
          By clicking the "Get Started!" button, you are creating a HabitHUB
          account, and you agree to HabitHUB's{" "}
          <span className="font-semibold text-blue-400 underline hover:text-blue-600 cursor-pointer">
            Terms of Use
          </span>{" "}
          and{" "}
          <span className="font-semibold text-blue-400 underline hover:text-blue-600 cursor-pointer">
            Privacy Policy
          </span>
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="w-[130px] py-1 shadow-md rounded-xl mx-auto text-[15px] text-center mt-5 bg-white hover:bg-gray-200 font-medium"
        >
          {submitting ? "Submitting..." : "Get Started!"}
        </button>
      </form>
      <div className="flex justify-center items-center mt-7">
        <img src={line} alt="" className="w-[60px] md:w-[100px] opacity-50" />
        <p className="text-xs">or sign up with</p>
        <img src={line} alt="" className="w-[60px] md:w-[100px] opacity-50" />
      </div>
      <AuthBtns />
    </div>
  );
};

export default SignUpForm;
