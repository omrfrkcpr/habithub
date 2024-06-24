/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "habit-light-green": "#ADF7B6",
        "habit-green": "#4EFF31",
        "habit-light-purple": "#C67ED2",
        "habit-purple": "#A817C0",
        "habit-dark-purple": "#D21DFF",
        "habit-creme": "#FFC09F",
        "habit-light-blue": "#B0FFFA",
        "habit-dark-blue": "#0038FF",
        "habit-blue": "#622BFF",
        "habit-yellow": "#FCFF52",
        "habit-turquoise": "#5BFFD8",
        "habit-pink": "#B92350",
        "habit-red": "#FF0000",
        "habit-light-gray": "#F8F9FA",
        "habit-gray": "#554E55",
        "habit-dark-gray": "#554E55",
        "habit-black": "#000000",
        "habit-white": "#ffffff",
      },
    },
  },
  plugins: [],
};
