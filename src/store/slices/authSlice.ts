import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const authState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    setAuthenticateUser: (state) => {
      state.isLoggedIn = true;
    },
    setUnauthenticateUser: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export default authSlice.reducer;

export const { setAuthenticateUser, setUnauthenticateUser } = authSlice.actions;
