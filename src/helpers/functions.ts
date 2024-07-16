export function formatDateString(dateString: string) {
  const inputDate = new Date(dateString);
  const today = new Date();

  // Check if inputDate is today
  const isToday =
    inputDate.getDate() === today.getDate() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getFullYear() === today.getFullYear();

  if (isToday) {
    return "Today";
  }

  // Format date as 28/06/2024
  const day = String(inputDate.getDate()).padStart(2, "0");
  const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = inputDate.getFullYear();

  // Get the day of the week
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[inputDate.getDay()];

  return `${day}/${month}/${year} - ${dayOfWeek}`;
}

export const generateWeeklyDueDates = (
  option: string,
  startDate: Date
): Date[] => {
  const currentDate = new Date();
  const newDueDates: Date[] = [];

  // Find the start date's week index in the year
  const startWeekIndex = getWeekIndex(currentDate);

  switch (option) {
    case "everyWeek":
      for (let i = startWeekIndex; i <= 52; i++) {
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + 7 * (i - startWeekIndex));
        newDueDates.push(nextDate);
      }
      break;
    case "every2Weeks":
      for (let i = startWeekIndex; i <= 52; i += 2) {
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + 7 * (i - startWeekIndex));
        newDueDates.push(nextDate);
      }
      break;
    case "everyWeekend":
      for (let i = startWeekIndex; i <= 52; i++) {
        const saturday = new Date(currentDate);
        saturday.setDate(
          currentDate.getDate() +
            (6 - currentDate.getDay() + 7 * (i - startWeekIndex))
        );
        const sunday = new Date(saturday);
        sunday.setDate(saturday.getDate() + 1);
        newDueDates.push(saturday, sunday);
      }
      break;
    default:
      break;
  }

  // Add startDate to the beginning of the array if it's not already included
  if (!newDueDates.some((date) => date.getTime() === startDate.getTime())) {
    newDueDates.unshift(new Date(startDate));
  }

  return newDueDates;
};

// Helper function to get the week index of a date in the year
const getWeekIndex = (date: Date): number => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const dayOfYear =
    Math.floor(
      (date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;
  return Math.ceil(dayOfYear / 7);
};

export const generateMonthlyDueDates = (
  option: string,
  startDate: Date
): Date[] => {
  const currentDate = new Date();
  const newDueDates: Date[] = [];
  const currentDay = currentDate.getDate(); // Current day of the month

  // Calculate remaining months in the current year
  let monthsToAdd = 12 - currentDate.getMonth();

  // Add startDate to newDueDates
  newDueDates.push(new Date(startDate));

  switch (option) {
    case "firstDay":
      // Skip the current month if current day is past the 1st
      if (currentDay > 1) {
        monthsToAdd -= 1;
      }
      for (let i = 0; i < monthsToAdd; i++) {
        const nextDate = new Date(currentDate);
        nextDate.setMonth(
          currentDate.getMonth() + i + (currentDay > 1 ? 1 : 0),
          1
        );
        newDueDates.push(nextDate);
      }
      break;

    case "lastDay":
      // Skip the current month if current day is past the last day of the month
      if (
        currentDay >
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        ).getDate()
      ) {
        monthsToAdd -= 1;
      }
      for (let i = 0; i < monthsToAdd; i++) {
        const nextDate = new Date(currentDate);
        nextDate.setMonth(
          currentDate.getMonth() +
            i +
            (currentDay > nextDate.getDate() ? 1 : 0) +
            1,
          0
        );
        newDueDates.push(nextDate);
      }
      break;

    default:
      if (option.startsWith("specificDay")) {
        const day = parseInt(option.split("-")[1]);
        // Skip the current month if current day is past the specific day
        if (currentDay > day) {
          monthsToAdd -= 1;
        }
        for (let i = 0; i < monthsToAdd; i++) {
          const nextDate = new Date(currentDate);
          nextDate.setMonth(
            currentDate.getMonth() + i + (currentDay > day ? 1 : 0),
            day
          );
          newDueDates.push(nextDate);
        }
      }
      break;
  }

  // Add startDate to the beginning of the array if it's not already included
  if (!newDueDates.some((date) => date.getTime() === startDate.getTime())) {
    newDueDates.unshift(new Date(startDate));
  }

  return newDueDates;
};

export const generateDailyDueDates = (
  startDate: Date,
  dailyDays: string[]
): Date[] => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const startDayIndex = startDate.getDay(); // Start day index (0: Sunday, 1: Monday, ..., 6: Saturday)
  const newDueDates: Date[] = [];

  // Add startDate to newDueDates
  newDueDates.push(new Date(startDate));

  dailyDays.forEach((day) => {
    const dayIndex = daysOfWeek.indexOf(day);
    if (dayIndex !== -1) {
      const daysToAdd = (dayIndex - startDayIndex + 7) % 7;
      const nextDate = new Date(startDate);
      nextDate.setDate(startDate.getDate() + daysToAdd);
      newDueDates.push(nextDate);
    }
  });

  // Add startDate to the beginning of the array if it's not already included
  if (!newDueDates.some((date) => date.getTime() === startDate.getTime())) {
    newDueDates.unshift(new Date(startDate));
  }

  return newDueDates;
};

export function singularizeAndCapitalize(word: string) {
  // Simple plural to singular conversion
  if (word.endsWith("s")) {
    word = word.slice(0, -1);
  }
  // Capitalize the first letter
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};

export const getTodoUpdateSuccessMessage = (todoInfo: any) => {
  if (todoInfo?.isCompleted) {
    return "Super! You've completed this task!";
  } else if (todoInfo?.name && todoInfo?.description) {
    return "Todo successfully edited!";
  } else if (todoInfo?.priority) {
    return "Priority updated!";
  } else {
    return "";
  }
};
