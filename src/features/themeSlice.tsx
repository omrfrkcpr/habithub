import { createSlice } from "@reduxjs/toolkit";

const storedTheme = localStorage.getItem("theme");
const initialState = {
  darkMode: storedTheme ? JSON.parse(storedTheme) : false,
};

if (!storedTheme) {
  localStorage.setItem("theme", JSON.stringify(false));
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem("theme", JSON.stringify(state.darkMode));
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
