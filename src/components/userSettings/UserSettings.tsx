import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import Profile from "./Profile";
import Account from "./Account";

const UserSettings = () => {
  const [selectedTab, setSelectedTab] = useState<string>("profile");
  return (
    <div className="flex flex-col py-8 px-5 gap-4 h-[455px] md:h-[545px]">
      <section
        id="bar"
        className="flex items-between justify-between w-full bg-habit-light-purple rounded-md"
      >
        <button
          onClick={() => setSelectedTab("profile")}
          className={`flex gap-1 items-center justify-center flex-1 py-2 rounded-md outline-none text-[12px] md:text-[16px] ${
            selectedTab === "profile"
              ? "bg-purple-200 text-black"
              : "text-white bg-inherit hover:underline"
          }`}
        >
          <FaRegUser />
          Profile
        </button>
        <button
          onClick={() => setSelectedTab("account")}
          className={`flex gap-1 items-center justify-center flex-1 py-2 rounded-md outline-none text-[12px] md:text-[16px] ${
            selectedTab === "account"
              ? "bg-purple-200 text-black"
              : "text-white bg-inherit hover:underline"
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
          ) : (
            selectedTab === "account" && (
              <div className="flex flex-col gap-4">
                {/* Account settings form */}
                <Account />
              </div>
            )
          )}
        </>
      </section>
    </div>
  );
};

export default UserSettings;
