/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",

  initialState: {
    todos: [],
    loading: false,
    error: false,
  },

  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getTodos: (state, { payload: { data } }) => {
      state.loading = false;
      state.todos = data;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, getTodos, fetchFail } = todoSlice.actions;
export default todoSlice.reducer;
