import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import calendarGif from "../assets/calendar.gif";
import { RootState } from "../app/store";
import useTaskCalls from "../hooks/useTaskCalls";
import { useSelector } from "react-redux";

const Setup = () => {
  const navigate = useNavigate();
  const { date } = useSelector((state: RootState) => state.date);
  const { getTaskData } = useTaskCalls();
  const [messages] = useState<string[]>([
    "Settings are being adjusted...",
    "Are you ready?",
    "Let's start creating tasks!",
  ]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);

  const handleNextMessage = () => {
    setCurrentMessageIndex((prevIndex) => prevIndex + 1);
  };

  // After all messages redirect to contract page
  if (currentMessageIndex === messages.length) {
    navigate("/home");
  }

  useEffect(() => {
    getTaskData("tasks", `?date=${date}`);
    getTaskData("tags");
  }, []);

  return (
    <>
      <div className="h-[100vh] w-[100vw] bg-white z-50 fixed">
        <div className="h-full w-full flex flex-col justify-center items-center self-center gap-4">
          <img src={calendarGif} alt="" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            key={currentMessageIndex}
            onAnimationComplete={handleNextMessage}
          >
            <div className="text-center mb-4 w-[300px] h-[100px] flex items-center justify-center">
              <h1 className="text-2xl md:text-3xl font-bold text-[#FF5E54]">
                {messages[currentMessageIndex]}
              </h1>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Setup;
