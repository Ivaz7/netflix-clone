import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  popularMovies: {},
}

export const movieDataSlice = createSlice({
  name: "movieData",
  initialState,
  reducers: {
    setPopulerMovie: (state, action) => {
      state.popularMovies = action.payload;
    },
  },
})

export const { setPopulerMovie } = movieDataSlice.actions;

export default movieDataSlice.reducer;