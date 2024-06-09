/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#f3c4fb",
        gray: "#f5f5f5",
        blue: "#bde0fe",
        orange: "#ffc09f",
        yellow: "#ffee93",
        creme: "#fcf5c7",
        green: "#adf7b6",
        white: "#fdfdfd",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
