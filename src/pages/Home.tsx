import React from "react";
import DateTimePicker from "../layouts/DateTimePicker";
import Logo from "../components/commons/Logo";
import UserSettings from "../layouts/UserSettings";

const Home = () => {
  return (
    <div className="relative h-screen w-screen dark:bg-[#3e284a]">
      <div className="absolute w-[280px] h-screen flex flex-col p-3 border-r border-gray-400 dark:border-gray-500 dark:text-white dark:bg-[#311a3e]">
        <div className="flex gap-1 justify-center items-center">
          <Logo />
          <h1 className="text-md md:text-xl lg:text-2xl font-bold">HabitHUB</h1>
        </div>
        <DateTimePicker />
      </div>
      <div className="absolute top-5 right-5">
        <UserSettings />
      </div>
    </div>
  );
};

export default Home;
