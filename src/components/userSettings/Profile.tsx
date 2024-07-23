import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import AvatarSection from "./AvatarSection";
import InputField from "../inputs/ProfileInput";
import useAuthCalls from "../../hooks/useAuthCalls";

const Profile = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { updateUser } = useAuthCalls();
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    avatar: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [removeExistingAvatar, setRemoveExistingAvatar] =
    useState<boolean>(false);

  useEffect(() => {
    setProfileForm({
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      email: currentUser?.email || "",
      username: currentUser?.username || "",
      avatar: currentUser?.avatar || "",
    });
  }, [currentUser]);

  useEffect(() => {
    return () => {
      // Clean up URL object when component unmounts or file is removed
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

  const handleFileRemove = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setProfileForm((prev) => ({ ...prev, avatar: currentUser?.avatar || "" }));
    setRemoveExistingAvatar(false);
  };

  const handleRemoveExistingAvatar = () => {
    setRemoveExistingAvatar(true);
    setProfileForm((prev) => ({ ...prev, avatar: "" }));
    setSelectedFile(null);
    setFilePreview(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();

    if (profileForm.firstName !== currentUser?.firstName) {
      formData.append("firstName", profileForm.firstName || "");
    }
    if (profileForm.lastName !== currentUser?.lastName) {
      formData.append("lastName", profileForm.lastName || "");
    }
    if (profileForm.email !== currentUser?.email) {
      formData.append("email", profileForm.email || "");
    }
    if (profileForm.username !== currentUser?.username) {
      formData.append("username", profileForm.username || "");
    }
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    } else if (removeExistingAvatar) {
      formData.append("avatar", ""); // delete existing avatar
    }

    await updateUser(formData);
  };

  const avatarSrc = profileForm.avatar
    ? profileForm.avatar.includes("/uploads/")
      ? `http://127.0.0.1:8000${profileForm.avatar}`
      : profileForm.avatar
    : "https://i.pinimg.com/736x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg";

  const inputFields = [
    {
      label: "First Name",
      type: "text",
      value: profileForm.firstName,
      name: "firstName",
    },
    {
      label: "Last Name",
      type: "text",
      value: profileForm.lastName,
      name: "lastName",
    },
    { label: "Email", type: "email", value: profileForm.email, name: "email" },
    {
      label: "Username",
      type: "text",
      value: profileForm.username,
      name: "username",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <form
        className="flex flex-col mt-3"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <AvatarSection
          filePreview={filePreview}
          avatarSrc={avatarSrc}
          handleRemoveExistingAvatar={handleRemoveExistingAvatar}
          handleFileRemove={handleFileRemove}
          setSelectedFile={setSelectedFile}
          setFilePreview={setFilePreview}
          setProfileForm={setProfileForm}
          setRemoveExistingAvatar={setRemoveExistingAvatar}
        />
        <section id="name-email-username">
          <div className="flex justify-between gap-2">
            {[...inputFields]
              .slice(0, 2)
              .map((field: ProfileInputProps, index: number) => {
                const { label, type, value, name } = field;
                return (
                  <InputField
                    key={index}
                    label={label}
                    type={type}
                    value={value}
                    name={name}
                    onChange={handleInputChange}
                  />
                );
              })}
          </div>
          <div className="flex justify-between gap-2">
            {[...inputFields]
              .slice(2, 4)
              .map((field: ProfileInputProps, index: number) => {
                const { label, type, value, name } = field;
                return (
                  <InputField
                    key={index}
                    label={label}
                    type={type}
                    value={value}
                    name={name}
                    onChange={handleInputChange}
                  />
                );
              })}
          </div>
        </section>
        <button
          type="submit"
          className="mt-4 px-2 py-1 text-[12px] md:text-[16px] md:px-4 md:py-2 bg-orange-400 hover:bg-orange-300 text-white rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
