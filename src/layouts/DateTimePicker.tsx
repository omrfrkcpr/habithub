import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import Clock from "react-clock";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const DateTimePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(
    `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(
      2,
      "0"
    )}`
  );
  const [currentDate, setCurrentDate] = useState(new Date());
  const [manualTimeSelected, setManualTimeSelected] = useState(false);

  // console.log("Date: ", selectedDate?.toDateString());
  // console.log("Time: ", selectedTime);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!manualTimeSelected) {
        setCurrentDate(new Date());
        setSelectedTime(
          `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(
            2,
            "0"
          )}`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [manualTimeSelected]);

  const handleTimeChange = (time: string | null) => {
    if (time) {
      setSelectedTime(time);
      setManualTimeSelected(true);
    } else {
      setSelectedTime(
        `${currentDate.getHours()}:${String(currentDate.getMinutes()).padStart(
          2,
          "0"
        )}`
      );
      setManualTimeSelected(false);
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-[250px] h-[530px]">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MMMM d, yyyy"
        inline
        minDate={new Date()} // enabled history
      />

      <TimePicker
        onChange={handleTimeChange}
        value={selectedTime}
        className="text-center border p-2"
        disableClock={true}
      />
      <Clock value={currentDate} className="mt-2" />
    </div>
  );
};

export default DateTimePicker;
