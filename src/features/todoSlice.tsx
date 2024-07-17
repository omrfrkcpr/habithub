/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState: TodoSliceStateValues = {
  todos: [],
  tags: [],
  todayTodos: [],
  tagTodos: [],
  loading: false,
  error: false,
};

const todoSlice = createSlice({
  name: "todo",

  initialState,

  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    setSuccess: (state: { [key: string]: any }, { payload: { data, url } }) => {
      state.loading = false;
      state[url] = data;
    },
    setTagTodos: (state, { payload }) => {
      state.loading = false;
      state.tagTodos = payload.data;
    },
    setTodayTodos: (state, { payload }) => {
      state.loading = false;
      state.todayTodos = payload.data;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, setSuccess, setTagTodos, setTodayTodos, fetchFail } =
  todoSlice.actions;
export default todoSlice.reducer;
