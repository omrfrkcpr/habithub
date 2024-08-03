import React from "react";
import Navbar from "../layouts/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-start md:justify-center h-[calc(100vh-60px)] mt-[60px] bg-white md:bg-habit-light-gray md:p-6">
        <div className="max-w-4xl w-full bg-white rounded-lg md:shadow-lg p-5 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[#CA87F4]">
            About Habithub
          </h1>
          <p className="text-sm md:text-md lg:text-lg mb-4 text-gray-700">
            Welcome to <span className="font-semibold">Habithub</span>! Our
            platform is designed to help people stay organized and productive by
            creating and managing tasks with ease. Whether you need to keep
            track of daily, weekly, or monthly tasks, Habithub has you covered.
          </p>
          <p className="text-sm md:text-md lg:text-lg mb-4 text-gray-700">
            With Habithub, you can organize your tasks under various lists,
            creating a personalized system that works for you. Our user-friendly
            design ensures that you can quickly and easily manage your tasks,
            keeping you on top of your schedule.
          </p>
          <p className="text-sm md:text-md lg:text-lg mb-4 text-gray-700">
            Our platform also provides statistics on the tasks you have
            completed and those that are still pending. This way, you can keep
            track of your progress and stay motivated.
          </p>
          <p className="text-sm md:text-md lg:text-lg mb-4 text-gray-700">
            Additionally, you can export your tasks for any given day as a PDF,
            DOCX, or even via email, making it easy to access your information
            wherever you are.
          </p>
          <p className="text-sm md:text-md lg:text-lg text-gray-700">
            We hope that Habithub helps you stay organized and productive,
            making your life a little bit easier.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
