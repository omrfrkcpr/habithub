import { Switch } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { repeatOptions } from "../../helpers/constants";
import { RootState } from "../../app/store";
import RepeatValueBtn from "../buttons/RepeatValueBtn";
import RepeatSection from "./RepeatSection";
import {
  generateMonthlyDueDates,
  generateWeeklyDueDates,
  generateDailyDueDates,
} from "../../helpers/functions";

const Repeat: React.FC<Repeat> = ({
  newTodo,
  setNewTodo,
  startDate,
  checked,
  setChecked,
}) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const [dailyDays, setDailyDays] = useState<string[]>([]);
  const [weeklyOption, setWeeklyOption] = useState<string>("");
  const [monthlyOption, setMonthlyOption] = useState<string>("");

  const weeklyOptions = [
    {
      value: "everyWeek",
      label: "Every Week",
      dates: generateWeeklyDueDates("everyWeek", startDate),
    },
    {
      value: "every2Weeks",
      label: "1 in 2 Weeks",
      dates: generateWeeklyDueDates("every2Weeks", startDate),
    },
    {
      value: "everyWeekend",
      label: "Every Weekends",
      dates: generateWeeklyDueDates("everyWeekend", startDate),
    },
  ];

  const monthlyOptions = [
    {
      value: "firstDay",
      label: "Every Month's First Day",
      dates: generateMonthlyDueDates("firstDay", startDate),
    },
    {
      value: "lastDay",
      label: "Every Month's Last Day",
      dates: generateMonthlyDueDates("lastDay", startDate),
    },
    {
      value: "specificDay-15",
      label: "Every 15th Day",
      dates: generateMonthlyDueDates("specificDay-15", startDate),
    },
  ];

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    if (!checked) {
      setNewTodo({ ...newTodo, repeat: "daily", dueDates: [] });
    }
  }, [checked]);

  useEffect(() => {
    if (newTodo.repeat === "weekly") {
      setWeeklyOption("everyWeek");
    } else if (newTodo.repeat === "monthly") {
      setMonthlyOption("firstDay");
    }
  }, [newTodo.repeat]);

  useEffect(() => {
    setNewTodo({ ...newTodo, dueDates: generateDueDates() });
  }, [dailyDays, weeklyOption, monthlyOption, startDate, newTodo.repeat]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const handleRepeatChange = (repeatOption: string) => {
    setNewTodo({
      ...newTodo,
      repeat: repeatOption,
      dueDates: generateDueDates(),
    });
  };

  const generateDueDates = () => {
    setNewTodo({
      ...newTodo,
      dueDates: [],
    });
    let newDueDates: Date[] = [];

    switch (newTodo.repeat) {
      case "daily":
        newDueDates = generateDailyDueDates(startDate, dailyDays);
        break;
      case "weekly":
        newDueDates = generateWeeklyDueDates(weeklyOption, startDate);
        break;
      case "monthly":
        newDueDates = generateMonthlyDueDates(monthlyOption, startDate);
        break;
      default:
        break;
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
  const repeatConfigurations = {
    daily: {
      options: daysOfWeek.map((day: string, index: number) => ({
        value: day,
        label: day,
        isDisabled:
          index + 1 < new Date().getDay() || index + 1 === startDayIndex,
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
      <p
        className={`${
          checked ? "" : "pointer-events-none opacity-50"
        } mb-3 font-light text-gray-500 dark:text-white/70 text-[9px] md:text-[13px]`}
      >
        Depending on the selections you make here, your new todo will
        automatically be added to the dates in addition to or in conjunction
        with the date you specified.
      </p>
      <div className={`${checked ? "" : "pointer-events-none opacity-50"}`}>
        <div className="mt-3">
          <div className="flex gap-2 border-b border-gray-300 pb-4">
            {Object.entries(repeatOptions).map(([value, label]) => (
              <RepeatValueBtn
                key={value}
                value={value}
                label={label}
                selectedValue={newTodo.repeat}
                onClick={handleRepeatChange}
              />
            ))}
          </div>
          {Object.entries(repeatConfigurations).map(
            ([key, config]) =>
              newTodo.repeat === key && (
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
