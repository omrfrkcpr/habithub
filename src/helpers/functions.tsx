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
  const currentDate = new Date(startDate);
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
  const currentDate = new Date(startDate);
  const newDueDates: Date[] = [];
  const monthsToAdd = 12 - currentDate.getMonth(); // Calculate remaining months in the current year

  switch (option) {
    case "firstDay":
      for (let i = 0; i < monthsToAdd; i++) {
        const nextDate = new Date(currentDate);
        nextDate.setMonth(currentDate.getMonth() + i, 1);
        newDueDates.push(nextDate);
      }
      break;
    case "lastDay":
      for (let i = 0; i < monthsToAdd; i++) {
        const nextDate = new Date(currentDate);
        nextDate.setMonth(currentDate.getMonth() + i + 1, 0);
        newDueDates.push(nextDate);
      }
      break;
    default:
      if (option.startsWith("specificDay")) {
        const day = parseInt(option.split("-")[1]);
        for (let i = 0; i < monthsToAdd; i++) {
          const nextDate = new Date(currentDate);
          nextDate.setMonth(currentDate.getMonth() + i, day);
          newDueDates.push(nextDate);
        }
      }
      break;
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

  // Calculate the maximum days to add based on the start day
  let maxDaysToAdd = 0;
  if (startDayIndex === 0) {
    // If start day is Sunday
    maxDaysToAdd = 7; // Can add up to 7 days (Sunday to Saturday)
  } else {
    maxDaysToAdd = 7 - startDayIndex + 1; // Days left in the current week
  }

  // Add startDate to newDueDates
  newDueDates.push(new Date(startDate));

  dailyDays.forEach((day) => {
    const dayIndex = daysOfWeek.indexOf(day);
    if (dayIndex >= startDayIndex && dayIndex < startDayIndex + maxDaysToAdd) {
      const nextDate = new Date(startDate);
      nextDate.setDate(startDate.getDate() + (dayIndex - startDayIndex));
      newDueDates.push(nextDate);
    }
  });

  return newDueDates;
};
