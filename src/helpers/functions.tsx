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
