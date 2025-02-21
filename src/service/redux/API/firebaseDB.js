import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { database } from "../../../backEndFireBase/firebaseConfig";
import { ref, set } from "firebase/database";

export const firebaseDBSlice = createApi({
  reducerPath: "firebaseDB",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    setDatabase: builder.mutation({
      async queryFn({ userId, email }) {
        try {
          const reference = ref(database, 'user/' + userId);
          await set(reference, { email });

          return { data: "User data saved successfully" };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
  }),
});

export const { useSetDatabaseMutation } = firebaseDBSlice;