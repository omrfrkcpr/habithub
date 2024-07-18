import React, { useEffect, useState, useRef } from "react";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import toastNotify from "../../helpers/toastNotify";
import useAuthCalls from "../../hooks/useAuthCalls";

interface ProfileFormValues {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
  username?: string;
}

const Profile: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { updateUser } = useAuthCalls();
  const initialProfileFormState = {
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
    username: "",
  };
  const [profileForm, setProfileForm] = useState<ProfileFormValues>(
    initialProfileFormState
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setProfileForm({
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      email: currentUser?.email,
      username: currentUser?.username,
    });
    handleFileRemove();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileType = file.type;

      if (fileType === "image/jpeg" || fileType === "image/png") {
        setSelectedFile(file);
        setProfileForm({ ...profileForm, avatar: URL.createObjectURL(file) });
      } else {
        toastNotify("error", "Only JPEG and PNG formats are allowed.");
      }
    }
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setProfileForm({ ...profileForm, avatar: currentUser?.avatar });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    return () => {
      // Clean up URL object when component unmounts or file is removed
      if (selectedFile) {
        URL.revokeObjectURL(profileForm.avatar as string);
      }
    };
  }, [selectedFile, profileForm.avatar]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("firstName", profileForm.firstName || "");
    formData.append("lastName", profileForm.lastName || "");
    formData.append("email", profileForm.email || "");
    formData.append("username", profileForm.username || "");
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    updateUser(formData);
  };

  return (
    <div>
      <h3 className="text-[10px] md:text-[14px] font-light">
        Update your profile informations here
      </h3>
      <form
        action=""
        className="flex flex-col mt-5"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <section className="flex space-x-5 items-center">
          <div className="w-[fit-content] space-y-2">
            <label className="ms-3 font-semibold">Avatar</label>
            <img
              src={profileForm.avatar}
              alt="profile-avatar"
              className="w-20 h-20 rounded-full"
            />
          </div>
          <div className="flex flex-col mt-6 gap-2">
            <div className="w-3/4 flex items-center justify-start">
              <label className="flex gap-1 items-center justify-center px-2 py-1 border border-gray-200 text-[10px] md:text-[14px] cursor-pointer relative w-[100px] rounded-lg bg-white hover:bg-habit-light-gray">
                <FiUpload />
                Upload
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  ref={fileInputRef}
                  className="absolute opacity-0 cursor-pointer z-50 w-full h-full"
                  onChange={handleFileChange}
                />
              </label>
              {selectedFile && (
                <div className="ml-3 flex items-center justify-center space-x-2">
                  <span className="text-sm">{selectedFile.name}</span>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={handleFileRemove}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              )}
            </div>
            <p className="text-[10px] md:text-[14px] font-light">
              For best results, upload an image 512x512 or larger
              <br />
              Allowed Formats: JPEG, PNG
            </p>
          </div>
        </section>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
