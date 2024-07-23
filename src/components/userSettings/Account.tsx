import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthCalls from "../../hooks/useAuthCalls";
import toastNotify from "../../helpers/toastNotify";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword?: string;
}

const Account = () => {
  const { logout, updateUser, deleteUser } = useAuthCalls();
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const initialPasswordForm = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const [passwordForm, setPasswordForm] =
    useState<PasswordFormValues>(initialPasswordForm);
  const [showCurrentPass, setShowCurrentPass] = useState<boolean>(false);
  const [showNewPass, setShowNewPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);

  const handleChangeClick = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordForm;
    if (!currentPassword || !newPassword || !confirmPassword) {
      toastNotify("info", "All fields are required to change your password!");
    } else {
      if (validatePassword(newPassword)) {
        if (newPassword !== confirmPassword) {
          toastNotify("error", "Passwords do not match!");
          setPasswordForm(initialPasswordForm);
          return;
        } else {
          // Call the API to change the password. Confirm password field is just for client-side security. Database doesnt care about it.
          updateUser({
            password: newPassword,
            oldPassword: currentPassword,
          });
          setPasswordForm(initialPasswordForm);
        }
      } else {
        toastNotify("error", "Invalid Password!");
        return;
      }
    }
  };

  const handleForgotClick = () => {
    logout(false);
    navigate("/forgot-password");
  };

  const handleDeleteAccount = () => {
    if (currentUser) {
      deleteUser();
    } else {
      toastNotify("error", "Please log in again to perform this action");
      navigate("/signin");
    }
  };

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%]).{6,}$/;

  const validatePassword = (password: string) => {
    return passwordRegex.test(password);
  };

  return (
    <div>
      <section id="password-section" className="pb-4">
        <div className="flex flex-col space-y-2 mt-1 md:mt-2 flex-1">
          <label className="font-semibold text-[11px] md:text-[14px]">
            Current password
          </label>
          <div className="relative">
            <input
              type={showCurrentPass ? "text" : "password"}
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  currentPassword: e.target.value,
                })
              }
              className="py-1 px-3 border border-gray-300 rounded-md outline-none text-[10px] md:text-[14px] text-black/60 w-full"
              placeholder="Enter current password"
            />
            <button
              onClick={() => setShowCurrentPass((prevState) => !prevState)}
              className="absolute right-4 top-2 text-gray-700 hover:text-gray-500"
            >
              {showCurrentPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-2 mt-1 md:mt-4 flex-1">
          <label className="font-semibold text-[11px] md:text-[14px]">
            New password
          </label>
          <div className="relative">
            <input
              type={showNewPass ? "text" : "password"}
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  newPassword: e.target.value,
                })
              }
              className="py-1 px-3 border border-gray-300 rounded-md outline-none text-[10px] md:text-[14px] text-black/60 w-full"
              placeholder="Enter new password"
            />
            <button
              onClick={() => setShowNewPass((prevState) => !prevState)}
              className="absolute right-4 top-2 text-gray-700 hover:text-gray-500"
            >
              {showNewPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <p
            className={`text-[9px] md:text-[11px] font-light ${
              passwordForm.newPassword === ""
                ? "text-black"
                : validatePassword(passwordForm.newPassword)
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            New password must have at least 6 characters, include one uppercase
            and one lowercase letter, one number and one symbol (@!#$%).
            Example: <span className="underline">StrongPass@176</span>
          </p>
        </div>
        <div className="flex flex-col space-y-2 mt-1 md:mt-4 flex-1">
          <label className="font-semibold text-[11px] md:text-[14px]">
            Confirm new password
          </label>
          <div className="relative">
            <input
              type={showConfirmPass ? "text" : "password"}
              value={passwordForm.confirmPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  confirmPassword: e.target.value,
                })
              }
              className="py-1 px-3 border border-gray-300 rounded-md outline-none text-[10px] md:text-[14px] text-black/60 w-full"
              placeholder="Re-type new password"
            />
            <button
              onClick={() => setShowConfirmPass((prevState) => !prevState)}
              className="absolute right-4 top-2 text-gray-700 hover:text-gray-500"
            >
              {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-3 md:mt-4">
          <button
            onClick={handleChangeClick}
            className="text-[12px] md:text-[14px] py-1 px-2 rounded-md bg-orange-400 hover:bg-orange-300 text-white"
          >
            Change password
          </button>
          <button
            onClick={handleForgotClick}
            className="text-[9px] md:text-[12px] text-black hover:text-black/60 hover:underline"
          >
            Forgot password?
          </button>
        </div>
      </section>
      <section id="danger-zone" className="border-t border-gray-300 pt-1">
        <div className="flex mt-3 bg-red-100 border border-red-200 p-3 rounded-lg justify-between gap-4">
          <div className="flex flex-col">
            <p className="font-semibold text-[10px] md:text-[13px] text-red-800">
              Delete account
            </p>
            <p className="text-[8px] md:text-[11px] text-red-900">
              Permanently remove your account. This action is not reversible.
              After removing account all datas related to this account will be
              alse deleted permanently.
            </p>
          </div>
          <div className="flex justify-center items-center w-[350px]">
            <button
              onClick={handleDeleteAccount}
              className="text-[10px] md:text-[12px] p-2 bg-red-50 hover:opacity-60 text-red-800 font-semibold rounded-lg"
            >
              Delete account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Account;
