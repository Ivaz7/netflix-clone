import { configureStore } from "@reduxjs/toolkit";
import { tmdbApiSlice } from "./API/tmdbApiSlicee.js";
import QandAReducer from "./slice/QandAData.js";
import signUpEmailReducer from "./slice/signUpEmailSlice.js";
import { fireBaseAuthSlice } from "./API/fireBaseAuthSlice.js";
import { firebaseDBSlice } from "./API/firebaseDB.js"; 
import profileEditReducer from "./API/profileEditSlice.js";
import showsDataReducer from "./slice/showsData.js";

export const store = configureStore({
  reducer: {
    [tmdbApiSlice.reducerPath]: tmdbApiSlice.reducer,
    QandAData: QandAReducer,
    signUpEmail: signUpEmailReducer,
    [fireBaseAuthSlice.reducerPath]: fireBaseAuthSlice.reducer,
    [firebaseDBSlice.reducerPath]: firebaseDBSlice.reducer,
    profileEdit: profileEditReducer,
    showsData: showsDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [
          "fireBaseAuth/signUpUser/fulfilled",
          "fireBaseAuth/checkEmailExists/fulfilled",
        ],
      },
    })
      .concat(tmdbApiSlice.middleware)
      .concat(fireBaseAuthSlice.middleware)
      .concat(firebaseDBSlice.middleware),
});
