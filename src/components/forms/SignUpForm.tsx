import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthBtns from "../buttons/AuthBtns";
import { useNavigate } from "react-router-dom";
import SignUpInput from "../inputs/SignUpInput";
import PasswordCheckList from "../inputs/PasswordCheckList";
import useAuthCalls from "../../hooks/useAuthCalls";
import { CircleLoader } from "react-spinners";

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

const SignUpForm = () => {
  const { register } = useAuthCalls();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showChecklist, setShowChecklist] = useState<boolean>(false);
  const checklistRef = useRef<HTMLDivElement>(null);

  // Close the checklist when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Check if checklistRef, passwordDivRef, or confirmPasswordDivRef exist
      if (
        checklistRef.current &&
        !checklistRef.current.contains(event.target as Node)
      ) {
        // Close the checklist
        setShowChecklist(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [checklistRef]);

  const handleSubmit = async (values: SignUpFormValues) => {
    setSubmitting(true);

    const formValues = { ...values };
    delete formValues.confirmPassword; // confirmPassword is not needed in database. Its just for client and security requirements.

    console.log(formValues);
    await register(formValues);

    setSubmitting(false);
    formik.resetForm(); // Reset the form after submission
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
      id: 1,
      type: "text",
      name: "firstName",
      placeholder: "Firstname",
      showToggle: false,
    },
    {
      id: 2,
      type: "text",
      name: "lastName",
      placeholder: "Lastname",
      showToggle: false,
    },
    {
      id: 3,
      type: "text",
      name: "email",
      placeholder: "Email",
      showToggle: false,
    },
    {
      id: 4,
      type: showPass ? "text" : "password",
      name: "password",
      placeholder: "Password",
      showToggle: true,
      showPassword: showPass,
      onToggleShowPassword: () => setShowPass((prevState) => !prevState),
    },
    {
      id: 5,
      type: showConfirmPass ? "text" : "password",
      name: "confirmPassword",
      placeholder: "Confirm Password",
      showToggle: true,
      showPassword: showConfirmPass,
      onToggleShowPassword: () => setShowConfirmPass((prevState) => !prevState),
    },
  ];

  return (
    <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[90%] md:w-[80%] lg:w-[60%] h-auto max-w-[700px] max-h-[fit-content] xl:h-[625px] bg-[#f8f9fadb] shadow-md rounded-lg py-5 md:py-3 px-2 mt-[36px] md:mt-[28px] text-center flex flex-col justify-between">
      <h3 className="text-habit-light-purple font-bold text-center text-[15px] md:text-[20px]">
        Get started with your account
      </h3>
      <p className="w-[95%] md:w-[80%] mx-auto text-[10px] md:text-[12px] font-light text-center">
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
        {inputFields.map((field: SignUpInputFields) => (
          <SignUpInput
            key={field.id}
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
            password={
              field.name === "confirmPassword" ? formik.values.password : ""
            }
          />
        ))}
        {showChecklist && (
          <div
            ref={checklistRef}
            className="bg-[#ededed] w-[90%] xl:w-[500px] pt-2  text-left z-50 absolute top-[315px] md:top-[330px] shadow-md clip-message-box"
          >
            <PasswordCheckList
              password={formik.values.password}
              confirmPassword={formik.values.confirmPassword}
              setShowChecklist={setShowChecklist}
            />
          </div>
        )}
        <p
          className={`text-[10px] font-light mt-8 md:mt-10 w-[80%] max-w-[400px]`}
        >
          By clicking the "Get Started!" button, you are creating a HabitHUB
          account, and you agree to HabitHUB's{" "}
          <span className="font-semibold text-blue-400 underline hover:text-blue-600 cursor-pointer">
            Terms of Use
          </span>{" "}
          and{" "}
          <span
            onClick={() =>
              window.open(
                "https://www.termsfeed.com/live/ed8b4e15-b05a-41d6-b12b-920a89756f29"
              )
            }
            className="font-semibold text-blue-400 underline hover:text-blue-600 cursor-pointer"
          >
            Privacy Policy
          </span>
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="w-[130px] h-[34px] py-1 shadow-md rounded-xl mx-auto flex items-center justify-center text-[15px] text-center mt-5 bg-white hover:bg-gray-200 font-medium"
        >
          {submitting ? <CircleLoader size={20} /> : "Get Started!"}
        </button>
      </form>
      <AuthBtns />
    </div>
  );
};

export default SignUpForm;
