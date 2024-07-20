import React, { useEffect, useState } from "react";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import toastNotify from "../../helpers/toastNotify";
import useAuthCalls from "../../hooks/useAuthCalls";
import { useDropzone, DropzoneOptions } from "react-dropzone";

interface ProfileFormValues {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
  username?: string;
}

const Profile = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { updateUser } = useAuthCalls();
  const [profileForm, setProfileForm] = useState<ProfileFormValues>({
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

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const fileType = file.type;

    if (
      fileType === "image/jpeg" ||
      fileType === "image/png" ||
      fileType === "image/jpg"
    ) {
      setSelectedFile(file);
      const objectURL = URL.createObjectURL(file);
      setFilePreview(objectURL);
      setProfileForm((prev) => ({ ...prev, avatar: objectURL }));
      setRemoveExistingAvatar(false);
    } else {
      toastNotify("error", "Only JPEG, JPG and PNG formats are allowed.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
  } as DropzoneOptions);

  const handleFileRemove = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setProfileForm((prev) => ({ ...prev, avatar: currentUser?.avatar || "" }));
    setRemoveExistingAvatar(false);
  };

  useEffect(() => {
    return () => {
      // Clean up URL object when component unmounts or file is removed
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

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

    // console.log(formData);

    await updateUser(formData);
  };

  const avatarSrc = profileForm.avatar
    ? profileForm.avatar.includes("/uploads/")
      ? `http://127.0.0.1:8000${profileForm.avatar}`
      : profileForm.avatar
    : "https://i.pinimg.com/736x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg";

  return (
    <div>
      <form
        className="flex flex-col mt-3"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <section
          className="flex space-x-5 items-center relative"
          id="avatar-section"
        >
          <div className="space-y-2 w-full h-full z-50">
            <label className="font-semibold text-[11px] md:text-[14px]">
              Avatar
            </label>
            <div className="flex justify-between">
              <p className="text-[8px] md:text-[11px] font-light">
                For best results, upload an image 512x512 or larger
                <br />
                Allowed Formats: JPEG, JPG and PNG. (Max Size: 10MB)
              </p>
              <button
                type="button"
                className="text-[8px] md:text-[11px] flex items-center mt-3 gap-1 text-red-500 font-semibold hover:text-red-300"
                onClick={handleRemoveExistingAvatar}
              >
                <span>Remove</span>
                <FiTrash2 />
              </button>
            </div>
            <div
              {...getRootProps({ className: "dropzone" })}
              className="w-full h-full rounded-md p-2 flex items-center justify-start bg-white hover:bg-gray-100 cursor-pointer border-dashed border border-gray-300"
            >
              <input {...getInputProps()} />
              <img
                src={filePreview ? filePreview : avatarSrc}
                alt="profile-avatar"
                className="w-20 h-20 md:w-28 md:h-28 border ms-2 md:ms-4 border-gray-400 rounded-full object-cover"
              />
              <div className="flex flex-col absolute left-[120px] md:left-[180px] z-50">
                {selectedFile ? (
                  <div className="flex items-center justify-start space-x-2">
                    <span className="text-[10px] md:text-[14px]">
                      {selectedFile.name}
                    </span>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={(e) => {
                        e.stopPropagation(); // To prevent onDrop from being triggered
                        handleFileRemove();
                      }}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center gap-1">
                    <FiUpload className="mb-1 md:mb-3 text-[18px] md:text-[24px]" />
                    <p className="text-[9px] md:text-[13px] font-medium">
                      Drag and drop files here to upload
                    </p>
                    <p className="text-[9px] md:text-[13px] font-light">
                      Or click to select a file."
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <section id="name-email-username">
          <div className="flex justify-between gap-2">
            <div className="flex flex-col space-y-2 mt-4 flex-1">
              <label className="font-semibold text-[11px] md:text-[14px]">
                First Name
              </label>
              <input
                type="text"
                autoComplete="off"
                className="p-1 border border-gray-300 rounded-md outline-none text-[10px] md:text-[14px] text-black/60"
                value={profileForm.firstName}
                onChange={(e) =>
                  setProfileForm((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col space-y-2 mt-4 flex-1">
              <label className="font-semibold text-[11px] md:text-[14px]">
                Last Name
              </label>
              <input
                type="text"
                autoComplete="off"
                className="p-1 border border-gray-300 rounded-md outline-none text-[10px] md:text-[14px] text-black/60"
                value={profileForm.lastName}
                onChange={(e) =>
                  setProfileForm((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="flex flex-col space-y-2 mt-4 flex-1">
              <label className="font-semibold text-[11px] md:text-[14px]">
                Email
              </label>
              <input
                type="email"
                autoComplete="off"
                className="p-1 border border-gray-300 rounded-md outline-none text-[10px] md:text-[14px] text-black/60"
                value={profileForm.email}
                onChange={(e) =>
                  setProfileForm((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col space-y-2 mt-4 flex-1">
              <label className="font-semibold text-[11px] md:text-[14px]">
                Username
              </label>
              <input
                type="text"
                autoComplete="off"
                className="p-1 border border-gray-300 rounded-md outline-none text-[10px] md:text-[14px] text-black/60"
                value={profileForm.username}
                onChange={(e) =>
                  setProfileForm((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
              />
            </div>
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
