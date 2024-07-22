import React, { ReactElement, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import Profile from "./Profile";
import Account from "./Account";

const UserSettings = () => {
  const [selectedTab, setSelectedTab] = useState<string>("profile");

  return (
    <div className="flex flex-col pt-10 pb-6 px-5 gap-4 h-[455px] md:h-[545px]">
      <section
        id="bar"
        className="flex justify-between w-full bg-habit-light-purple rounded-md"
      >
        {[
          { id: "profile", label: "Profile", icon: <FaRegUser /> },
          { id: "account", label: "Account", icon: <CiSettings /> },
        ].map(
          ({
            id,
            label,
            icon,
          }: {
            id: string;
            label: string;
            icon: ReactElement;
          }) => (
            <button
              key={id}
              onClick={() => setSelectedTab(id)}
              className={`flex gap-1 items-center justify-center flex-1 py-2 rounded-md outline-none text-[12px] md:text-[16px] ${
                selectedTab === id
                  ? "bg-purple-200 text-black"
                  : "text-white bg-inherit hover:underline"
              }`}
            >
              {icon}
              {label}
            </button>
          )
        )}
      </section>
      <section id="components" className="flex flex-col gap-4">
        {selectedTab === "profile" ? <Profile /> : <Account />}
      </section>
    </div>
  );
};

export default UserSettings;
