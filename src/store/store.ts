// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/slices/authSlice";
import { submissionsReducer } from "@/app/slices/submissionSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    submission: submissionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
