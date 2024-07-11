import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userStatus: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    login: (state, action) => {
      state.userStatus = true;
    },

    logout: (state, action) => {
      state.userStatus = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
