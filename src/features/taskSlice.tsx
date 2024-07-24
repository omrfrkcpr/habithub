/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState: TaskSliceStateValues = {
  tasks: [],
  tasksDetails: [],
  editTaskId: "",
  tags: [],
  tagsDetails: [],
  todayTasks: [],
  todayTaskDetails: [],
  tagTasks: [],
  loading: false,
  error: false,
};

const taskSlice = createSlice({
  name: "task",

  initialState,

  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    setSuccess: (state: { [key: string]: any }, { payload: { data, url } }) => {
      state.loading = false;
      state[url] = data?.data;
      state[url + "Details"] = data?.details;
    },
    setTagTasks: (state, { payload }) => {
      state.loading = false;
      state.tagTasks = payload.data;
    },
    setTodayTasks: (state, { payload }) => {
      state.loading = false;
      state.todayTasks = payload.data?.data;
      state.todayTaskDetails = payload.data?.details;
    },
    setEditTaskId: (state, { payload }) => {
      state.editTaskId = payload;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  setSuccess,
  setTagTasks,
  setTodayTasks,
  setEditTaskId,
  fetchFail,
} = taskSlice.actions;
export default taskSlice.reducer;
