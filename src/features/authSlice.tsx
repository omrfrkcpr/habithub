import { createSlice } from "@reduxjs/toolkit";

const initialState: InitialAuthState = {
  currentUser: null,
  loading: false,
  error: false,
  accessToken: null,
  refreshToken: null,
  remainingTime: 0,
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
      state.currentUser = payload?.user;
      state.accessToken = payload?.bearer?.access;
      state.refreshToken = payload?.bearer?.refresh;
    },
    updateSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload?.new;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload?.user;
      // state.isAdmin = payload?.user?.isAdmin;
      state.accessToken = payload?.bearer?.access;
      state.refreshToken = payload?.bearer?.refresh;
      state.remainingTime = 45;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
      // state.isAdmin = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.remainingTime = 0;
    },
    refreshSuccess: (state, { payload }) => {
      state.accessToken = payload?.bearer?.access;
      state.remainingTime = 45 * 60; // Reset duration when session is extended
    },
    forgotSuccess: (state) => {
      state.loading = false;
    },
    resetSuccess: (state) => {
      state.loading = false;
    },
    verifySuccess: (state) => {
      state.loading = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    setRemainingTime: (state, { payload }) => {
      state.remainingTime = payload;
    },
    decrementTime: (state) => {
      if (state.remainingTime > 0) {
        state.remainingTime -= 1;
      }
    },
  },
});

export const {
  fetchStart,
  fetchFail,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  updateSuccess,
  refreshSuccess,
  forgotSuccess,
  resetSuccess,
  verifySuccess,
  setRemainingTime,
  decrementTime,
} = authSlice.actions;
export default authSlice.reducer;
