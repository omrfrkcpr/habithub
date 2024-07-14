/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState: TodoSliceStateValues = {
  todos: [],
  tags: [],
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
    getSuccess: (state: { [key: string]: any }, { payload: { data, url } }) => {
      state.loading = false;
      state[url] = data;
    },
    getTagTodos: (state, { payload }) => {
      state.loading = false;
      state.tagTodos = payload;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, getSuccess, getTagTodos, fetchFail } =
  todoSlice.actions;
export default todoSlice.reducer;
