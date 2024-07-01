import { Switch } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  repeatOptions,
  daysOfWeek,
  monthlyOptions,
  weeklyOptions,
} from "../../helpers/constants";
import { RootState } from "../../app/store";

const Repeat: React.FC<Repeat> = ({ newTask, setNewTask, startDate }) => {
  const [checked, setChecked] = useState(false);
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const [dailyDays, setDailyDays] = useState<string[]>([]);
  const [weeklyOption, setWeeklyOption] = useState<string>("everyWeek");
  const [monthlyOption, setMonthlyOption] = useState<string>("firstDay");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    if (!e.target.checked) {
      setNewTask({ ...newTask, repeat: "", dueDates: [startDate] });
    }
  };

  const handleRepeatChange = (repeatOption: string) => {
    setNewTask({ ...newTask, repeat: repeatOption });
  };

  const generateDueDates = () => {
    const currentDate = new Date(startDate);
    let prevDueDates: Date[] = [];

    if (newTask.repeat === "daily") {
      dailyDays.forEach((day) => {
        const dayIndex = daysOfWeek.indexOf(day);
        if (dayIndex >= 0) {
          const nextDate = new Date(currentDate);
          nextDate.setDate(
            currentDate.getDate() + ((7 + dayIndex - currentDate.getDay()) % 7)
          );
          prevDueDates.push(nextDate);
        }
      });
    } else if (newTask.repeat === "weekly") {
      for (let i = 0; i < 4; i++) {
        const nextDate = new Date(currentDate);
        if (weeklyOption === "everyWeek") {
          nextDate.setDate(currentDate.getDate() + 7 * i);
        } else if (weeklyOption === "every2Weeks") {
          nextDate.setDate(currentDate.getDate() + 14 * i);
        } else if (weeklyOption === "everyWeekend") {
          const saturday = new Date(currentDate);
          saturday.setDate(
            currentDate.getDate() + (6 - currentDate.getDay() + 7 * i)
          );
          const sunday = new Date(saturday);
          sunday.setDate(saturday.getDate() + 1);
          prevDueDates.push(saturday, sunday);
          continue;
        }
        prevDueDates.push(nextDate);
      }
    } else if (newTask.repeat === "monthly") {
      for (let i = 0; i < 3; i++) {
        const nextDate = new Date(currentDate);
        if (monthlyOption === "firstDay") {
          nextDate.setMonth(currentDate.getMonth() + i, 1);
        } else if (monthlyOption === "lastDay") {
          nextDate.setMonth(currentDate.getMonth() + i + 1, 0);
        } else if (monthlyOption === "specificDay") {
          const day = parseInt(monthlyOption.split("-")[1]);
          nextDate.setMonth(currentDate.getMonth() + i, day);
        }
        prevDueDates.push(nextDate);
      }
    }

    return prevDueDates;
  };

  const handleDailyDayClick = (day: string) => {
    const updatedDays = dailyDays.includes(day)
      ? dailyDays.filter((d) => d !== day)
      : [...dailyDays, day];
    setDailyDays(updatedDays);
    setNewTask({ ...newTask, dueDates: generateDueDates() });
  };

  const handleWeeklyOptionChange = (option: string) => {
    setWeeklyOption(option);
    setNewTask({ ...newTask, dueDates: generateDueDates() });
  };

  const handleMonthlyOptionChange = (option: string) => {
    setMonthlyOption(option);
    setNewTask({ ...newTask, dueDates: generateDueDates() });
  };

  return (
    <div className="flex items-start flex-col mb-3 bg-white dark:bg-[#4b3455] p-4 rounded-[8px] flex-1">
      <div className="flex justify-between items-center w-full">
        <h3
          className={`font-semibold text-[12px] md:text-[16px] ${
            checked
              ? "text-habit-gray dark:text-white"
              : "text-habit-gray/60 dark:text-white/60"
          }`}
        >
          Repeat
        </h3>
        <Switch
          inputProps={{ "aria-label": "controlled" }}
          checked={checked}
          onChange={handleChange}
          color={darkMode ? "success" : "secondary"}
        />
      </div>
      <div className={`${checked ? "" : "pointer-events-none opacity-50"}`}>
        <div className="mt-3">
          <div className="flex gap-2">
            {Object.entries(repeatOptions).map(([value, label]) => (
              <button
                key={value}
                value={value}
                onClick={() => handleRepeatChange(value)}
                className={`bg-white dark:bg-[#4b3455] text-sm md:text-md py-1 px-2 rounded-md border border-gray-300 dark:border-gray-600 ${
                  newTask.repeat === value ? "bg-blue-500 text-white" : ""
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {newTask.repeat === "daily" && (
            <div className="mt-3">
              {daysOfWeek.map((day: string) => (
                <button
                  key={day}
                  className={`capitalize py-1 px-2 m-1 rounded-full text-[12px] md:text-[16px] ${
                    dailyDays.includes(day)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() => handleDailyDayClick(day)}
                >
                  {day}
                </button>
              ))}
            </div>
          )}
          {newTask.repeat === "weekly" && (
            <div className="mt-3 flex gap-2">
              {weeklyOptions.map(
                ({ value, label }: { value: string; label: string }) => (
                  <button
                    key={value}
                    value={value}
                    onClick={() => handleWeeklyOptionChange(value)}
                    className={`bg-white dark:bg-[#4b3455] text-sm md:text-md py-1 px-2 rounded-md border border-gray-300 dark:border-gray-600 ${
                      weeklyOption === value ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          )}
          {newTask.repeat === "monthly" && (
            <div className="mt-3 flex gap-2">
              {monthlyOptions.map(
                ({ value, label }: { value: string; label: string }) => (
                  <button
                    key={value}
                    value={value}
                    onClick={() => handleMonthlyOptionChange(value)}
                    className={`bg-white dark:bg-[#4b3455] text-sm md:text-md py-1 px-2 rounded-md border border-gray-300 dark:border-gray-600 ${
                      monthlyOption === value ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Repeat;
