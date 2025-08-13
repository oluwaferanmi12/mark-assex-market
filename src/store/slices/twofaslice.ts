import { createSlice } from "@reduxjs/toolkit";

export const show2faObject = {
  isActive: false,
};

export const twoFaSlice = createSlice({
  name: "slice-2fa",
  initialState: show2faObject,
  reducers: {
    setShow2faFlow: (state, { payload }) => {
      state.isActive = payload;
    },
  },
});

export default twoFaSlice.reducer;

export const { setShow2faFlow } = twoFaSlice.actions;
