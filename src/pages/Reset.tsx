import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toastNotify from "../helpers/toastNotify";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import { CircleLoader } from "react-spinners";

const resetValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .required("Password is required.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/\d/, "Password must contain at least one number.")
    .matches(
      /[!@#$%]/,
      "Password must contain at least one special character (@,!,#,$,%)"
    ),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match.")
    .required("Please confirm your new password."),
});

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (
    values: ResetValues,
    { resetForm }: FormikHelpers<ResetValues>
  ) => {
    try {
      const { confirmNewPassword, ...requestData } = values;
      console.log("Request Data:", requestData); // Debugging

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}auth/reset/${token}`,
        requestData
      );

      console.log("Response:", response); // Debugging

      if (response.status === 200) {
        toastNotify("success", "Your password has been successfully reset.");

        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      }
    } catch (error) {
      console.log("Error: ", error);
      toastNotify("error", "An error occurred. Please try again.");
    } finally {
      resetForm();
    }
  };

  const togglePassStyle = "w-3 h-3 md:w-4 md:h-4 hover:text-black/60";

  const resetInputFields = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      id: 2,
      name: "newPassword",
      type: showNewPassword ? "text" : "password",
      toggleIcon: showNewPassword ? (
        <FaRegEyeSlash className={`${togglePassStyle}`} />
      ) : (
        <FaRegEye className={`${togglePassStyle}`} />
      ),
      onToggleClick: toggleNewPasswordVisibility,
      placeholder: "New password",
    },
    {
      id: 3,
      name: "confirmNewPassword",
      type: showConfirmPassword ? "text" : "password",
      toggleIcon: showConfirmPassword ? (
        <FaRegEyeSlash className={`${togglePassStyle}`} />
      ) : (
        <FaRegEye className={`${togglePassStyle}`} />
      ),
      onToggleClick: toggleConfirmPasswordVisibility,
      placeholder: "Confirm new password",
    },
  ];

  const CustomErrorMessage = ({ name }: { name: string }) => (
    <ErrorMessage
      name={name}
      render={(msg) => (
        <span className="text-red-500 text-[11px] md:text-[14px] ">{msg}</span>
      )}
    />
  );

  return (
    <div
      className="w-screen h-screen z-50 relative bg-habit-light-gray"
      style={{
        backgroundImage: `url(${`
        ${process.env.REACT_APP_AWS_S3_BASE_URL}auth-Bg.jpg`})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        overflow: "hidden",
      }}
    >
      <Navbar />
      <div className="absolute w-full top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col justify-center items-center">
        <div className="flex flex-col justify-between text-center w-[320px] md:w-[500px] p-5 h-auto md:h-[420px] rounded-xl">
          <div>
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
              Reset Password
            </h2>
            <p className="text-xs md:text-md lg:text-[14px] mt-2 mb-3 font-light md:font-normal">
              Please enter your new password below. Make sure it is strong and
              unique. Confirm your new password to complete the reset process.
            </p>
          </div>
          <Formik
            initialValues={{
              email: "",
              newPassword: "",
              confirmNewPassword: "",
            }}
            validationSchema={resetValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                {resetInputFields.map((field: ResetInputFields) => (
                  <div
                    key={field.name}
                    className="relative flex flex-col text-left items-center"
                  >
                    <Field
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      autoComplete="off"
                      placeholder={field.placeholder}
                      className="my-2 w-[270px] md:w-[350px] mx-auto px-2 py-1 outline-none rounded-md md:mx-4 text-[13px] md:text-[15px]"
                      required
                    />
                    <CustomErrorMessage name={field.name} />
                    <span
                      onClick={field.onToggleClick}
                      className="cursor-pointer absolute right-[12px] md:right-[65px] top-[22px] md:top-[24px] -translate-y-[50%]"
                    >
                      {field.toggleIcon}
                    </span>
                  </div>
                ))}
                <div className="mt-5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="py-1 px-2 bg-white hover:bg-habit-light-gray rounded-xl w-[100px] text-[10px] md:text-[14px] h-[28px]"
                  >
                    {isSubmitting ? (
                      <CircleLoader
                        size={18}
                        className="text-black dark:text-white"
                      />
                    ) : (
                      "Reset"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
