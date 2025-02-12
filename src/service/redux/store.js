import { configureStore } from "@reduxjs/toolkit";
import { tmdbApiSlice } from "./API/tmdbApiSlicee.js";
import populerMovieReducer from "./slice/populerMovie.js";

export const store = configureStore({
  reducer: {
    [tmdbApiSlice.reducerPath]: tmdbApiSlice.reducer,
    populerMovie: populerMovieReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApiSlice.middleware),
});