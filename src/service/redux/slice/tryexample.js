import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
}

export const tryExampleSlide = createSlice({
  name: "tryExampleSlice",
  initialState,
  reducers: {
    setStatus: (state) => {
      state.status = !state.status;
    },
    setTrue: (state) => {
      state.status = true;
    }
  }
})

export const { setStatus, setTrue } = tryExampleSlide.actions;

export default tryExampleSlide.reducer;