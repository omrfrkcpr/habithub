import React, { useState, useRef, useEffect } from "react";
import DateTimePicker from "../layouts/DateTimePicker";
import Logo from "../components/commons/Logo";
import UserMenu from "../layouts/UserMenu";
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
import useTodoCalls from "../hooks/useTodoCalls";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<number>(0);
  const { getTodoData, getTodayTodosData } = useTodoCalls();
  const { todayTodos } = useSelector((state: RootState) => state.todo);
  const { date } = useSelector((state: RootState) => state.date);

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

  useEffect(() => {
    getTodoData("todos", `?date=${date}`);
    getTodoData("tags");
  }, []);

  // Ref to store previous date
  const previousDateRef = useRef<Date | null>(null);

  useEffect(() => {
    const currentDate = new Date(date);
    if (previousDateRef.current === null) {
      previousDateRef.current = currentDate;
    } else {
      const previousDay = previousDateRef.current.getDate();
      const currentDay = currentDate.getDate();
      if (currentDay !== previousDay) {
        getTodoData("todos", `?date=${date}`);
        previousDateRef.current = currentDate; // update the previousDateRef to current date
      }
    }
  }, [date, getTodoData]);

  // New useEffect to track day change for getTodayTodosData
  const previousDayRef = useRef<number | null>(null);

  useEffect(() => {
    const checkDayChange = setInterval(() => {
      const currentDay = new Date().getDate();
      if (previousDayRef.current === null) {
        previousDayRef.current = currentDay;
      } else {
        if (currentDay !== previousDayRef.current) {
          getTodayTodosData();
          previousDayRef.current = currentDay; // update the previousDayRef to current day
        }
      }
    }, 1000); // Check every second

    return () => clearInterval(checkDayChange);
  }, [getTodayTodosData]);

  // console.log(new Date(new Date().toISOString()).getDate());
  console.log(todayTodos);

  useEffect(() => {
    if (todayTodos && todayTodos.length > 0) {
      // Todays todos for user notification
      Swal.fire({
        title: `Today's Todos`,
        html: `<ul>${[...todayTodos]
          .sort((a, b) => b.priority - a.priority)
          .map(
            ({ name, priority }: { name: string; priority: number }) =>
              `<li>${name} ${
                priority === 1 ? "🚀" : priority === 0 ? "🌟" : "🔥"
              }</li>`
          )
          .join("")}</ul>`,
        icon: "info",
        confirmButtonText: "Ok",
      });
    }
  }, [todayTodos]);

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
        <UserMenu setValue={setValue} />
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
