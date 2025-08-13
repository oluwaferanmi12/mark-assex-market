// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import twoFaReducer from "./slices/twofaslice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    twofa: twoFaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
