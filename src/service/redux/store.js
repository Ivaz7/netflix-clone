import { configureStore } from "@reduxjs/toolkit";
import { tmdbApiSlice } from "./API/tmdbApiSlicee.js";
import moviaDataReducer from "./slice/movieData.js";
import QandAReducer from "./slice/QandAData.js";
import signUpEmailReducer from "./slice/signUpEmailSlice.js";

export const store = configureStore({
  reducer: {
    [tmdbApiSlice.reducerPath]: tmdbApiSlice.reducer,
    movieData: moviaDataReducer,
    QandAData: QandAReducer,
    signUpEmail: signUpEmailReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApiSlice.middleware),
});