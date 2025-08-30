import { createSlice } from "@reduxjs/toolkit";

export const show2faObject = {
  isActive: false,
};

export const accountVerificationSlice = createSlice({
  name: "account-verification-slice",
  initialState: show2faObject,
  reducers: {
    setShowVerificationModal: (state, { payload }) => {
      state.isActive = payload;
    },
  },
});

export default accountVerificationSlice.reducer;

export const { setShowVerificationModal } = accountVerificationSlice.actions;
