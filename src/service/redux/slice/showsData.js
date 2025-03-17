import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  dataShows: {},
}

export const showsDataSlice = createSlice({
  name: "showsDataSlice",
  initialState,
  reducers: {
    setDataShows: (state, action) => {
      const value = action.payload;
      const object = value.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {});

      state.dataShows = {
        ...state.dataShows,
        ...object,
      }
    },
  }
}) 

export const { setDataShows } = showsDataSlice.actions;

export default showsDataSlice.reducer;