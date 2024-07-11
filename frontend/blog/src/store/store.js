import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../store/Slice.js";

const store = configureStore({
  reducer: authSlice,
});

export default store;
