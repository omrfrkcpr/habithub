import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthBtns from "../buttons/AuthBtns";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import line from "../../assets/straight-line.png";

interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

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
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username should not contain more than 20 characters"),
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

  // const initialSignUpValues: SignUpFormValues = {
  //   username: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // };

  const handleSubmit = async (values: SignUpFormValues) => {
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
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[90%] md:w-[80%] lg:w-[60%] h-auto max-w-[750px] max-h-[fit-content] xl:h-[615px] bg-[#f8f9fadb] shadow-md rounded-lg py-6 px-2 mt-[28px] md:mt-[35px] text-center flex flex-col justify-between">
      <h3 className="text-habit-light-purple font-bold text-center text-[15px] md:text-[20px] mt-4">
        Get started with your account
      </h3>
      <p className="w-[70%] mx-auto text-[10px] md:text-[12px] font-light text-center">
        Track your habits. Achieve your goals. Do it all with HabitHub's Task
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
        className="flex flex-col justify-center items-center"
      >
        <div className="w-[90%] md:w-[50%] mx-auto text-left relative">
          <input
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Email"
            className="w-full mx-auto text-[10px] md:text-[13px] placeholder:font-light outline-none mt-4 py-2 px-3 rounded-lg "
            aria-describedby="emailError"
          />
          {formik.touched.email && formik.errors.email && (
            <div
              id="emailError"
              className="text-red-600 text-[10px] mt-[10px] text-left ms-1"
              aria-live="assertive"
            >
              {formik.errors.email}
            </div>
          )}
        </div>
        <div className="w-[90%] md:w-[50%] mx-auto text-left relative">
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            placeholder="Username"
            className="w-full mx-auto text-[10px] md:text-[13px] placeholder:font-light outline-none mt-4 py-2 px-3 rounded-lg "
            aria-describedby="usernameError"
          />
          {formik.touched.username && formik.errors.username && (
            <div
              id="usernameError"
              className="text-red-600 text-[10px] mt-[10px] text-left ms-1"
              aria-live="assertive"
            >
              {formik.errors.username}
            </div>
          )}
        </div>
        <div className="w-[90%] md:w-[50%] mx-auto text-center relative">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="w-full text-[10px] md:text-[13px] placeholder:font-light outline-none mt-4 py-2 px-3 rounded-lg "
            aria-describedby="passwordError"
          />
          {formik.touched.password && formik.errors.password && (
            <div
              id="passwordError"
              className="text-red-600 text-[10px] mt-[10px] text-left ms-1"
              aria-live="assertive"
            >
              {formik.errors.password}
            </div>
          )}
          <div
            onClick={() => setShowPass((prevState) => !prevState)}
            className="absolute right-4 top-6 md:top-7 text-gray-600 cursor-pointer"
          >
            {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
          </div>
        </div>
        <div className="w-[90%] md:w-[50%] mx-auto text-center relative">
          <input
            type={showConfirmPass ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            className="w-full text-[10px] md:text-[13px] placeholder:font-light outline-none mt-4 py-2 px-3 rounded-lg "
            aria-describedby="confirmPasswordError"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div
              id="confirmPasswordError"
              className="text-red-600 text-[10px] mt-[10px] text-left ms-1"
              aria-live="assertive"
            >
              {formik.errors.confirmPassword}
            </div>
          )}
          <div
            onClick={() => setShowConfirmPass((prevState) => !prevState)}
            className="absolute right-4 top-6 md:top-7 text-gray-600 cursor-pointer"
          >
            {showConfirmPass ? <FaRegEyeSlash /> : <FaRegEye />}
          </div>
        </div>

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
