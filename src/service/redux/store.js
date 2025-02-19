import { configureStore } from "@reduxjs/toolkit";
import { tmdbApiSlice } from "./API/tmdbApiSlicee.js";
import moviaDataReducer from "./slice/movieData.js";
import QandAReducer from "./slice/QandAData.js";
import signUpEmailReducer from "./slice/signUpEmailSlice.js";
import { fireBaseAuthSlice } from "./API/fireBaseAuthSlice.js";

export const store = configureStore({
  reducer: {
    [tmdbApiSlice.reducerPath]: tmdbApiSlice.reducer,
    movieData: moviaDataReducer,
    QandAData: QandAReducer,
    signUpEmail: signUpEmailReducer,
    [fireBaseAuthSlice.reducerPath]: fireBaseAuthSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "fireBaseAuth/signUpUser/fulfilled",
          "fireBaseAuth/checkEmailExists/fulfilled",
        ],
      },
    })
      .concat(tmdbApiSlice.middleware)
      .concat(fireBaseAuthSlice.middleware),
});
