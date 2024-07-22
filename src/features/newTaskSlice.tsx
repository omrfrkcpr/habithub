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
    setNewTask: (state, { payload }) => {
      return { ...state, ...payload };
    },
    setSingleTask: (state, { payload: { data } }) => {
      return { ...state, ...data };
    },
    resetNewTask: (state) => {
      return initialState;
    },
  },
});

export const { setNewTask, setSingleTask, resetNewTask } = newTaskSlice.actions;

export default newTaskSlice.reducer;
