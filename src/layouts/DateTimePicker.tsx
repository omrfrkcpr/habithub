import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import Clock from "react-clock";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { setDate, setTime } from "../features/dateSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";

const DateTimePicker = () => {
  const dispatch = useDispatch();
  const { date, time } = useSelector((state: RootState) => state.date);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [manualTimeSelected, setManualTimeSelected] = useState(false);

  // Update time in Redux only when minutes change
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDate(now);

      const currentMinutes = now.getMinutes();
      const selectedMinutes = new Date(time || "").getMinutes();

      if (!manualTimeSelected && currentMinutes !== selectedMinutes) {
        const formattedTime = `${now.getHours()}:${String(
          currentMinutes
        ).padStart(2, "0")}`;
        dispatch(setTime(formattedTime));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time, manualTimeSelected, dispatch]);

  // Update date in Redux when selectedDate changes
  const handleDateChange = (selectedDate: Date | null) => {
    if (selectedDate) {
      dispatch(setDate(selectedDate.toDateString()));
    }
  };

  // Handle manual time selection
  const handleTimeChange = (newTime: string | null) => {
    if (newTime) {
      setManualTimeSelected(true);
      dispatch(setTime(newTime));
    }
  };

  console.log("Date: ", date);
  console.log("Time: ", time);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-[250px] h-[530px] z-50">
      <DatePicker
        selected={new Date(date)}
        onChange={handleDateChange}
        dateFormat="MMMM d, yyyy"
        inline
        minDate={new Date()}
      />
      <TimePicker
        onChange={handleTimeChange}
        value={time}
        className="text-center border p-2"
        disableClock={true}
      />
      <Clock value={currentDate} className="mt-2" />
    </div>
  );
};

export default DateTimePicker;
