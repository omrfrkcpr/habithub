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
      state.currentUser = payload?.user;
      state.token = payload?.bearer?.access;
    },
    updateSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload?.new;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload?.user;
      // state.isAdmin = payload?.user?.isAdmin;
      state.token = payload?.bearer?.access;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
      // state.isAdmin = false;
      state.token = null;
    },
    refreshSuccess: (state, { payload }) => {
      state.token = payload?.bearer?.access;
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
} = authSlice.actions;
export default authSlice.reducer;
