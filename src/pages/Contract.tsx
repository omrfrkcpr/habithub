import React from 'react';
import { contractRules } from "../helpers/constants";
import useAuthCalls from "../hooks/useAuthCalls";
import Navbar from "../layouts/Navbar";
import { useNavigate } from "react-router-dom";

const Contract: React.FC = () => {
  const navigate = useNavigate();
  const { agreeContract } = useAuthCalls();

  const handleAgreeClick = () => {
    navigate("/setup");
    agreeContract();
  };

  return (
    <div className="h-[41.5rem] md:h-[43.4rem] relative max-w-[1800px] mx-auto">
      <Navbar />
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[90%] max-w-[1200px] max-h-[550px] md:max-h-[450px] flex justify-center items-center md:justify-between flex-col sm:flex-row p-5 sm:p-10 rounded-xl shadow-xl bg-habit-light-gray gap-5">
        <div className="space-y-1 order-1 md:order-0">
          <h1 className="text-lg lg:text-2xl xl:text-3xl mb-4">
            Let's make a <span className="font-bold">contract</span>
          </h1>
          <p className="text-sm md:text-md lg:text-lg font-semibold">I will</p>
          <ul className="list-disc pl-7 space-y-1 text-sm md:text-md lg:text-lg">
            {contractRules.map(({ id, emoji, content }) => (
              <li key={id} className="items-center list-item">
                <span className="mr-2">{emoji}</span>
                {content}
              </li>
            ))}
          </ul>
        </div>
        <div className="order-0 md:order-1">
          <img
            loading="lazy"
            src={`
              ${process.env.REACT_APP_AWS_S3_BASE_URL}aggrement.png`}
            alt="aggrement"
            className="w-[150px] h-[150px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] relative object-cover"
          />
        </div>
        <button
          onClick={handleAgreeClick}
          className="absolute -bottom-24 md:-bottom-40 lg:-bottom-32 left-[50%] -translate-x-[50%] -translate-y-[50%] w-[130px] bg-habit-light-gray hover:bg-gray-200 duration-300 rounded-md shadow-md mb-10 h-[30px] justify-center items-center"
        >
          I Agree
        </button>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Contract;
