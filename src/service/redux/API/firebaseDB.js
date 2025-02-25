import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { database } from "../../../backEndFireBase/firebaseConfig";
import { ref, set, get } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../backEndFireBase/firebaseConfig";

export const firebaseDBSlice = createApi({
  reducerPath: "firebaseDB",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    setDefaultDB: builder.mutation({
      async queryFn({ userId, email }) {
        try {
          const reference = ref(database, "user/" + userId);
          const snapshot = await get(reference);
          const userNameMatch = email.match(/^([^@]+)@/);
          const userName = userNameMatch ? userNameMatch[1] : "Unknown";
          if (!snapshot.exists()) {
            await set(reference, {
              email: email,
              userSelected: "empty",
              userOption: [
                {
                  name: userName,
                  statusAge: true,
                  history: "empty",
                  myList: "empty",
                },
                {
                  name: "Kids",
                  statusAge: false,
                  history: "empty",
                  myList: "empty",
                },
              ],
            });
          }
          return { data: "User data saved successfully" };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
    getData: builder.query({
      async queryFn() {
        try {
          const userUid = await new Promise((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(
              auth,
              (user) => {
                unsubscribe();
                if (user) {
                  resolve(user.uid);
                } else {
                  resolve(null);
                }
              },
              (error) => reject(error)
            );
          });
          
          if (!userUid) {
            return { data: { loginStatus: false, snapshotVal: null } };
          }
          
          const reference = ref(database, "user/" + userUid);
          const snapshot = await get(reference);
          const snapshotVal = snapshot.exists() ? snapshot.val() : null;
          
          return { data: { loginStatus: true, snapshotVal } };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
  }),
});

export const { useSetDefaultDBMutation, useGetDataQuery } = firebaseDBSlice;
