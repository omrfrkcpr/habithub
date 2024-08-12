import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Clock from "react-clock";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { setTime } from "../features/dateSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import useDate from "../hooks/useDate";
import TaskAnalytics from "./TaskAnalytics";
// import { useNavigate, useLocation } from "react-router-dom";

const DateTimePicker = ({
  setValue,
}: {
  setValue: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const dispatch = useDispatch();
  const { date, time } = useSelector((state: RootState) => state.date);
  const handleDateChange = useDate(setValue);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Update time in Redux only when minutes change
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDate(now);

      const currentMinutes = now.getMinutes();
      const selectedMinutes = new Date(time || "").getMinutes();

      if (currentMinutes !== selectedMinutes) {
        const formattedTime = `${now.getHours()}:${String(
          currentMinutes
        ).padStart(2, "0")}`;
        dispatch(setTime(formattedTime));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, time]);

  return (
    <div className="flex flex-col mx-auto items-center justify-center space-y-4 w-full h-[280px]  z-50">
      <div>
        <DatePicker
          selected={new Date(date)}
          onChange={handleDateChange}
          dateFormat="MMMM d, yyyy"
          inline
          minDate={new Date()}
        />
      </div>
      <div className="hidden lg:block absolute bottom-6">
        <Clock value={currentDate} />
      </div>
    </div>
  );
};

export default DateTimePicker;
