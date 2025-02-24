import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { database } from "../../../backEndFireBase/firebaseConfig";
import { ref, set, get } from "firebase/database";

export const firebaseDBSlice = createApi({
  reducerPath: "firebaseDB",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    setDefaultDB: builder.mutation({
      async queryFn({ userId, email }) {
        try {
          const reference = ref(database, 'user/' + userId);
          const snapshot = await get(reference);
          const userNameMatch = email.match(/^([^@]+)@/);
          const userName = userNameMatch ? userNameMatch[1] : "Unknown";      
          if (!snapshot.exists()) {
            await set(reference, { 
              email: email,
              userOption: [
                {
                  name: userName,
                  statusAge: true,
                },
                {
                  name: "Kids",
                  statusAge: false,
                }
              ]
            });
          }     
          return { data: "User data saved successfully" };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
  }),
});

export const { useSetDefaultDBMutation } = firebaseDBSlice;