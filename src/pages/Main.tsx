import React from "react";
import Navbar from "../layouts/Navbar";
import MainBg from "../components/backgrounds/MainBg";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-[100vh]">
      <Navbar />
      <MainBg />
      <div className="absolute top-[130px] left-[100px] space-y-8">
        <h1 className="text-6xl">Do your tasks</h1>
        <h1 className="text-6xl">
          <span className="font-bold">quickly</span> and{" "}
          <span className="font-bold">easy</span>
        </h1>
        <p className="text-xl font-extralight">
          Your tasks, your rules, our support
        </p>
        <button
          onClick={() => navigate("/signin")}
          className="text-md bg-white py-2 px-5 w-[160px] rounded-xl shadow-md font-bold hover:bg-gray-100"
        >
          Get Started
        </button>
      </div>
      <section className="absolute bottom-10 left-[53%] flex gap-10">
        <div className="grid grid-col-2 gap-2 w-[180px] text-sm font-light bg-habit-light-gray shadow-md p-5">
          <h2 className="font-bold">Easy to use</h2>
          <p>
            Simplified chore lists with intuitive layout for seamless daily
            planning
          </p>
        </div>
        <div className="grid grid-col-2 gap-2 w-[180px] text-sm font-light bg-habit-light-gray shadow-md p-5">
          <h2 className="font-bold">Full Support</h2>
          <p>
            Empower your productivity with personalized task management guided
            by your rules
          </p>
        </div>
        <div className="grid grid-col-2 gap-2 w-[180px] text-sm font-light bg-habit-light-gray shadow-md p-5">
          <h2 className="font-bold">Never feel lost</h2>
          <p>
            Stay seamlessly connected to your tasks anytime, anywhere with our
            sync mobile app
          </p>
        </div>
      </section>
    </div>
  );
};

export default Main;
