import { createSlice } from "@reduxjs/toolkit";
import { dataQandA } from "../../../data/Q&AauthScreenData";

const initialState = dataQandA;

export const QandASlice = createSlice({
  name: "QandASlice",
  initialState,
  reducers: {
    setQandAStatus: (state, action) => {
      const clickedIndex = action.payload;

      state.forEach((item, index) => {
        if (index === clickedIndex) {
          item.status = !item.status;
        } else {
          item.status = false;
        }
      });
    },
  }
})

export const { setQandAStatus } = QandASlice.actions;

export default QandASlice.reducer;