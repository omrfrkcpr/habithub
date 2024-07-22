/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState: TaskSliceStateValues = {
  tasks: [],
  singleTask: {
    id: "",
    name: "",
    cardColor: "",
    repeat: "",
    description: "",
    dueDates: [],
    priority: 0,
    isCompleted: false,
    tagId: {
      id: "",
      name: "",
    },
  },
  tags: [],
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
      state[url] = data;
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
    setSingleTask: (state, { payload: { data } }) => {
      state.loading = false;
      state.singleTask = data;
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
  setSingleTask,
  fetchFail,
} = taskSlice.actions;
export default taskSlice.reducer;
