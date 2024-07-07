import { createSlice } from "@reduxjs/toolkit";

const initialState: InitialAuthState = {
  currentUser: null,
  loading: false,
  error: false,
  token: null,
  // isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload?.data;
      state.token = payload?.token;
    },
    updateSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.currentUser = payload?.new;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload?.user;
      // state.isAdmin = payload?.user?.isAdmin;
      state.token = payload?.token;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
      // state.isAdmin = false;
      state.token = null;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  registerSuccess,
  updateSuccess,
  loginSuccess,
  logoutSuccess,
  fetchFail,
} = authSlice.actions;
export default authSlice.reducer;
