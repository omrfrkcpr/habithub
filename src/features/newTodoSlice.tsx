import { createSlice } from "@reduxjs/toolkit";

const initialState: NewTodo = {
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

const newTodoSlice = createSlice({
  name: "newTodo",
  initialState,
  reducers: {
    setNewTodo: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetNewTodo: (state) => {
      return initialState;
    },
  },
});

export const { setNewTodo, resetNewTodo } = newTodoSlice.actions;

export default newTodoSlice.reducer;
