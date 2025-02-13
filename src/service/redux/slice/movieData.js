import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popularMovies: {},
  popularTVShows: {},
  similarMovies: {},
  similarTVShows: {},
  searchResults: {},
};

export const movieDataSlice = createSlice({
  name: "movieData",
  initialState,
  reducers: {
    setPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    setPopularTVShows: (state, action) => {
      state.popularTVShows = action.payload;
    },
    setSimilarMovies: (state, action) => {
      state.similarMovies = action.payload;
    },
    setSimilarTVShows: (state, action) => {
      state.similarTVShows = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const {
  setPopularMovies,
  setPopularTVShows,
  setSimilarMovies,
  setSimilarTVShows,
  setSearchResults,
} = movieDataSlice.actions;

export default movieDataSlice.reducer;
