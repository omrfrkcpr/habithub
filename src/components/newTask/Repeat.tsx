import { Switch } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  repeatOptions,
  daysOfWeek,
  monthlyOptions,
  weeklyOptions,
} from "../../helpers/constants";
import { RootState } from "../../app/store";
import RepeatValueBtn from "../buttons/RepeatValueBtn";
import RepeatSection from "./RepeatSection";

const Repeat: React.FC<Repeat> = ({ newTask, setNewTask, startDate }) => {
  const [checked, setChecked] = useState(false);
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const [dailyDays, setDailyDays] = useState<string[]>([]);
  const [weeklyOption, setWeeklyOption] = useState<string>("everyWeek");
  const [monthlyOption, setMonthlyOption] = useState<string>("firstDay");

  useEffect(() => {
    if (!checked) {
      setNewTask({ ...newTask, repeat: "", dueDates: [startDate] });
    }
  }, [checked]);

  useEffect(() => {
    setNewTask({ ...newTask, dueDates: generateDueDates() });
  }, [dailyDays, weeklyOption, monthlyOption, startDate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const handleRepeatChange = (repeatOption: string) => {
    setNewTask({
      ...newTask,
      repeat: repeatOption,
      dueDates: generateDueDates(),
    });
  };

  const generateDueDates = () => {
    const currentDate = new Date(startDate);
    let newDueDates: Date[] = [];

    if (newTask.repeat === "daily") {
      for (let i = 0; i < 7; i++) {
        dailyDays.forEach((day) => {
          const dayIndex = daysOfWeek.indexOf(day);
          const nextDate = new Date(currentDate);
          nextDate.setDate(
            currentDate.getDate() +
              ((dayIndex - currentDate.getDay() + 7) % 7) +
              i * 7
          );
          newDueDates.push(nextDate);
        });
      }
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
          newDueDates.push(saturday, sunday);
          continue;
        }
        newDueDates.push(nextDate);
      }
    } else if (newTask.repeat === "monthly") {
      for (let i = 0; i < 3; i++) {
        const nextDate = new Date(currentDate);
        if (monthlyOption === "firstDay") {
          nextDate.setMonth(currentDate.getMonth() + i, 1);
        } else if (monthlyOption === "lastDay") {
          nextDate.setMonth(currentDate.getMonth() + i + 1, 0);
        } else if (monthlyOption.startsWith("specificDay")) {
          const day = parseInt(monthlyOption.split("-")[1]);
          nextDate.setMonth(currentDate.getMonth() + i, day);
        }
        newDueDates.push(nextDate);
      }
    }

    return newDueDates;
  };

  const handleDailyDayClick = (day: string) => {
    const updatedDays = dailyDays.includes(day)
      ? dailyDays.filter((d) => d !== day)
      : [...dailyDays, day];
    setDailyDays(updatedDays);
  };

  const handleWeeklyOptionChange = (option: string) => {
    setWeeklyOption(option);
  };

  const handleMonthlyOptionChange = (option: string) => {
    setMonthlyOption(option);
  };

  const startDayIndex = new Date(startDate).getDay();
  console.log(startDayIndex);
  const repeatConfigurations = {
    daily: {
      options: daysOfWeek.map((day: string, index: number) => ({
        value: day,
        label: day,
        isDisabled: index < new Date().getDay() || index === startDayIndex,
      })),
      selectedValue: dailyDays,
      onClick: handleDailyDayClick,
    },
    weekly: {
      options: weeklyOptions,
      selectedValue: weeklyOption,
      onClick: handleWeeklyOptionChange,
    },
    monthly: {
      options: monthlyOptions,
      selectedValue: monthlyOption,
      onClick: handleMonthlyOptionChange,
    },
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
          <div className="flex gap-2 border-b border-gray-300 pb-4">
            {Object.entries(repeatOptions).map(([value, label]) => (
              <RepeatValueBtn
                key={value}
                value={value}
                label={label}
                selectedValue={newTask.repeat}
                onClick={handleRepeatChange}
              />
            ))}
          </div>
          {Object.entries(repeatConfigurations).map(
            ([key, config]) =>
              newTask.repeat === key && (
                <RepeatSection
                  key={key}
                  options={config.options}
                  selectedValue={config.selectedValue}
                  onClick={config.onClick}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Repeat;
