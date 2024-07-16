import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userStatus: false,
  blog: {
    title: "",
    content: "",
  }
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

    update : (state, action) => {
      state.blog = action.payload
      console.log(state.blog)
    }
  },
});

export const { login, logout, update } = authSlice.actions;
export default authSlice.reducer;
