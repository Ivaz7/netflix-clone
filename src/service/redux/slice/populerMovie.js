import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: {},
}

export const populerMovieSlice = createSlice({
  name: "populerMovie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.data = action.payload;
    },
  },
})

export const { setMovies } = populerMovieSlice.actions;

export default populerMovieSlice.reducer;