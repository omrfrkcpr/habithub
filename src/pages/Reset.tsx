import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toastNotify from "../helpers/toastNotify";
import ActionBtn from "../components/buttons/ActionBtn";
import LockResetIcon from "@mui/icons-material/LockReset";
import Logo from "../components/commons/Logo";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
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
    setLoading(true);
    try {
      const { confirmNewPassword, ...requestData } = values;
      const response = await axios.post(
        `http://127.0.0.1:8000/auth/reset/${token}`,
        requestData
      );
      if (response.status === 200) {
        toastNotify("success", "Your password has been successfully reset.");
        resetForm();
      }
    } catch (error) {
      toastNotify("error", "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetInputFields = [
    {
      id: 1,
      name: "email",
      type: "email",
      label: "Email",
    },
    {
      id: 2,
      name: "newPassword",
      type: showNewPassword ? "text" : "password",
      label: "New Password",
      toggleIcon: showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />,
      onToggleClick: toggleNewPasswordVisibility,
    },
    {
      id: 3,
      name: "confirmNewPassword",
      type: showConfirmPassword ? "text" : "password",
      label: "Confirm New Password",
      toggleIcon: showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />,
      onToggleClick: toggleConfirmPasswordVisibility,
    },
  ];

  return (
    <div className="w-screen h-screen z-50 relative bg-habit-light-gray">
      <div className="absolute w-[fit-content] p-4 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]  flex flex-col justify-center items-center">
        <div className="flex gap-1 justify-center items-center">
          <Logo />
          <h1 className="text-md md:text-xl lg:text-2xl font-bold">HabitHUB</h1>
        </div>
        <h2 className="text-lg md:text-xl lg:text-2xl">Reset Password</h2>
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
                <div key={field.name}>
                  <label htmlFor={field.name}>{field.label}:</label>
                  <Field
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    className="my-2"
                    required
                  />
                  <ErrorMessage
                    name={field.name}
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <span
                    onClick={field.onToggleClick}
                    className="cursor-pointer absolute right-2 top-[50%] -translate-y-[50%]"
                  >
                    {field.toggleIcon}
                  </span>
                </div>
              ))}
              <ActionBtn
                type="submit"
                loading={loading}
                label="Reset"
                color="purple"
                icon={<LockResetIcon sx={{ color: "white" }} />}
                disabled={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
