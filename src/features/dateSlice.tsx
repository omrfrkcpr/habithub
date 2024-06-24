import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DateState {
  date: string;
  time: string;
}

const initialState: DateState = {
  date: new Date().toDateString(),
  time: `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(
    2,
    "0"
  )}`,
};

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setDate(state, action: PayloadAction<string>) {
      state.date = action.payload;
    },
    setTime(state, action: PayloadAction<string>) {
      state.time = action.payload;
    },
  },
});

export const { setDate, setTime } = dateSlice.actions;
export default dateSlice.reducer;
