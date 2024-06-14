import React from "react";

const MainCards = () => {
  return (
    <div className="absolute top-[400px] md:top-[530px] left-[100px] text-center md:text-left md:left-[500px] flex flex-col md:flex-row gap-10">
      <div className="grid grid-col-2 gap-2 w-[180px] text-sm font-light bg-habit-light-gray shadow-md p-3 md:p-5">
        <h2 className="font-bold">Easy to use</h2>
        <p>
          Simplified chore lists with intuitive layout for seamless daily
          planning
        </p>
      </div>
      <div className="grid grid-col-2 gap-2 w-[180px] text-sm font-light bg-habit-light-gray shadow-md p-3 md:p-5">
        <h2 className="font-bold">Full Support</h2>
        <p>
          Empower your productivity with personalized task management guided by
          your rules
        </p>
      </div>
      <div className="grid grid-col-2 gap-2 w-[180px] text-sm font-light bg-habit-light-gray shadow-md p-3 md:p-5">
        <h2 className="font-bold">Never feel lost</h2>
        <p>
          Stay seamlessly connected to your tasks anytime, anywhere with our
          sync mobile app
        </p>
      </div>
    </div>
  );
};

export default MainCards;
