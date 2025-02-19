import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: ""
};

export const signUpEmailSlice = createSlice({
  name: "signUpEmail",
  initialState,
  reducers: {
    setSignUpEmail: (state, action) => {
      state.email = action.payload
    }
  }
})

export const { setSignUpEmail } = signUpEmailSlice.actions;

export default signUpEmailSlice.reducer;