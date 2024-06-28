import React from "react";
import { useSelector } from "react-redux";
import DateTimePicker from "../layouts/DateTimePicker";
import Logo from "../components/commons/Logo";
import UserSettings from "../layouts/UserSettings";
import AddTaskBtn from "../components/buttons/AddTaskBtn";
import { RootState } from "../app/store";
import { formatDateString } from "../helpers/functions";

const Home = () => {
  const { date } = useSelector((state: RootState) => state.date);
  // console.log(date);
  return (
    <div className="relative h-screen w-screen dark:bg-[#3e284a] transition-colors duration-300">
      <div className="absolute w-[280px] h-screen flex flex-col p-3 border-r border-gray-400 dark:border-gray-500 dark:text-white dark:bg-[#311a3e]">
        <div className="flex gap-1 justify-center items-center">
          <Logo />
          <h1 className="text-md md:text-xl lg:text-2xl font-bold">HabitHUB</h1>
        </div>
        <DateTimePicker />
      </div>
      <div className="w-full h-full p-4 flex justify-end relative">
        <UserSettings />
        <AddTaskBtn />
      </div>
      <div className="absolute top-[90px] left-[300px] h-[90vh] w-auto">
        <h1 className="text-xl font-bold border-b border-black dark:border-habit-white dark:text-habit-white">
          {formatDateString(date)}
        </h1>
      </div>
    </div>
  );
};

export default Home;
