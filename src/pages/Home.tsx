import React, { useState, useRef, useEffect } from "react";
import DateTimePicker from "../layouts/DateTimePicker";
import Logo from "../components/commons/Logo";
import UserSettings from "../layouts/UserSettings";
import AddTodoBtn from "../components/buttons/AddTodoBtn";
import TodoList from "../layouts/TodoList";
import { MdMenu, MdClose } from "react-icons/md";
import NewTodo from "../layouts/NewTodo";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import TagLists from "../layouts/TagLists";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative min-h-screen h-[59rem] w-full dark:bg-[#3e284a] transition-colors duration-300">
      {/* Hamburger Menu */}
      <div
        className={`md:hidden absolute top-6 left-4 z-50 ${
          sidebarOpen && "hidden"
        }`}
      >
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-black dark:text-white hover:text-black/60 outline-none cursor-pointer"
        >
          <MdMenu size={30} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed min-h-[100vh] h-[40rem] flex flex-col p-3 z-50 border-r bg-white border-gray-400 dark:border-gray-500 dark:text-white dark:bg-[#311a3e] transition-transform duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-[280px]`}
        id="desktop-sidebar"
      >
        {/* Close Button */}
        <div className="md:hidden flex justify-end">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-black hover:text-black/60 dark:text-habit-white dark:hover:text-habit-white/50"
          >
            <MdClose size={30} />
          </button>
        </div>
        <Logo single={false} />
        <DateTimePicker />
      </div>

      {/* Main Content */}
      <div className="w-full h-[40rem] p-4 flex justify-end relative">
        <UserSettings />
        <AddTodoBtn value={value} setValue={setValue} />
      </div>

      <div className="absolute top-[50px] md:top-[80px] md:right-10 w-[90vw] h-[38rem] m-5 md:m-0 flex justify-center flex-col md:w-[calc(100vw-360px)]">
        <div className="w-full h-full">
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{
              height: "60px",
              "& .MuiTab-root": {
                fontWeight: "bold",
              },
              "& .Mui-selected": {
                color: "#C67ED2 !important",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#C67ED2 !important",
              },
            }}
          >
            <Tab
              icon={<FormatListBulletedIcon />}
              iconPosition="start"
              className="dark:text-white w-[100px]"
              label="Todos"
            />
            <Tab
              icon={<PlaylistAddCheckIcon />}
              iconPosition="start"
              className="dark:text-white w-[100px]"
              label="Lists"
            />
            <Tab
              icon={<PlaylistAddIcon />}
              iconPosition="start"
              className="dark:text-white w-[fit-content]"
              label="New Todo"
            />
          </Tabs>
          {value === 0 && <TodoList />}
          {value === 1 && <TagLists />}
          {value === 2 && <NewTodo />}
        </div>
      </div>
    </div>
  );
};

export default Home;
