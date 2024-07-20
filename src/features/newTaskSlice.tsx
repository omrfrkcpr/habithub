import { createSlice } from "@reduxjs/toolkit";

const initialState: NewTask = {
  name: "",
  description: "",
  cardColor: "#ADF7B6",
  repeat: "daily",
  priority: 0,
  dueDates: [],
  tagId: {
    id: "",
    name: "",
  },
  isCompleted: false,
};

const newTaskSlice = createSlice({
  name: "newTask",
  initialState,
  reducers: {
    setNewTask: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetNewTask: (state) => {
      return initialState;
    },
  },
});

export const { setNewTask, resetNewTask } = newTaskSlice.actions;

export default newTaskSlice.reducer;
