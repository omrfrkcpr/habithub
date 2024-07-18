import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { CiSettings } from "react-icons/ci";
import Profile from "./Profile";

const UserSettings = () => {
  const [selectedTab, setSelectedTab] = useState<string>("profile");
  return (
    <div className="flex flex-col py-8 px-5 gap-4">
      <section
        id="bar"
        className="flex items-between justify-between w-full gap-2 bg-habit-light-purple rounded-md"
      >
        <button
          onClick={() => setSelectedTab("profile")}
          className={`flex gap-1 items-center justify-center flex-1 py-2 rounded-md outline-none text-[12px] md:text-[16px] ${
            selectedTab === "profile"
              ? "bg-purple-200 text-black"
              : "text-white bg-inherit"
          }`}
        >
          <FaRegUser />
          Profile
        </button>
        <button
          onClick={() => setSelectedTab("notifications")}
          className={`flex gap-1 items-center justify-center flex-1 py-2 rounded-md outline-none text-[12px] md:text-[16px] ${
            selectedTab === "notifications"
              ? "bg-habit-light-purple/70 text-black"
              : "text-white bg-inherit"
          }`}
        >
          <HiOutlineBellAlert />
          Notifications
        </button>
        <button
          onClick={() => setSelectedTab("account")}
          className={`flex gap-1 items-center justify-center flex-1 py-2 rounded-md outline-none text-[12px] md:text-[16px] ${
            selectedTab === "account"
              ? "bg-habit-light-purple/70 text-black"
              : "text-white bg-inherit"
          }`}
        >
          <CiSettings />
          Account
        </button>
      </section>
      <section id="components">
        <>
          {selectedTab === "profile" ? (
            <div className="flex flex-col gap-4">
              {/* Profile settings form */}
              <Profile />
            </div>
          ) : selectedTab === "notifications" ? (
            <div className="flex flex-col gap-4">
              <h2>Notifications Settings</h2>
              {/* Notifications settings form */}
            </div>
          ) : (
            selectedTab === "account" && (
              <div className="flex flex-col gap-4">
                <h2>Account Settings</h2>
                {/* Account settings form */}
              </div>
            )
          )}
        </>
      </section>
    </div>
  );
};

export default UserSettings;
