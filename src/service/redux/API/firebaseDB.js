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
                  statusAge: false,
                  historyRating: "empty",
                  historyWatched: "empty",
                  myList: "empty",
                  imgProfile: "avatar1.png",
                  pinSecurity: "empty",
                },
                {
                  name: "Kids",
                  statusAge: true,
                  historyRating: "empty",
                  historyWatched: "empty",
                  myList: "empty",
                  imgProfile: "avatarKids.png",
                  pinSecurity: "empty",
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
            return { data: null };
          }
          
          const reference = ref(database, "user/" + userUid);
          const snapshot = await get(reference);
          const snapshotVal = snapshot.exists() ? snapshot.val() : null;
          
          return { data: snapshotVal };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),

    getLoginStatus: builder.query({
      async queryFn() {
        try {
          const isLoggedIn = await new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
              unsubscribe(); 
              resolve(!!user);
            });
          });
    
          return { data: isLoggedIn };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),

    setChangedUserData: builder.mutation({
      async queryFn({ value }) {
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
            return { data: null };
          }
          
          const reference = ref(database, "user/" + userUid);
          const snapshot = await get(reference);
          const snapshotVal = snapshot.exists() ? snapshot.val() : null;
          set(reference, {
            ...snapshotVal,
            ...value,
          })
          
          return { data: "User selected updated successfully" };
        } catch (error) {
          return { error: error.message };
        }
      }
    }),

    setAddUserOption: builder.mutation({
      async queryFn({ imgProfile, name, statusAge }) {
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
            return { data: null };
          }

          const reference = ref(database, "user/" + userUid);
          const snapshot = await get(reference);
          const snapshotVal = snapshot.exists() ? snapshot.val() : null;
          
          if (snapshotVal && snapshotVal.userOption) {
            const { userOption } = snapshotVal;
          
            if (Array.isArray(userOption) && userOption.length < 5) {
              set(ref(database, `user/${userUid}/userOption/${snapshotVal.userOption.length}`), {
                name: name,
                imgProfile: imgProfile,
                statusAge: statusAge,
                myList: 'empty',
                historyRating: "empty",
                historyWatched: "empty",
                pinSecurity: "empty",
              });
            }
          }          

          return { data: "User selected updated successfully" };
        } catch (error) {
          return { error: error.message };
        }
      }
    }),

    setDeleteUserOption: builder.mutation({
      async queryFn({ index }) {
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
            return { data: null };
          }
    
          const reference = ref(database, `user/${userUid}`);
          const snapshot = await get(reference);
          const snapshotVal = snapshot.exists() ? snapshot.val() : null;
    
          if (snapshotVal && Array.isArray(snapshotVal.userOption)) {
            let updatedUserOption = [...snapshotVal.userOption];

            if (!isNaN(snapshotVal.userSelected) && snapshotVal.userSelected === index) {
              await set(ref(database, `user/${userUid}/userSelected`), "empty");
            } else if (!isNaN(snapshotVal.userSelected) && snapshotVal.userSelected > index) {
              await set(ref(database, `user/${userUid}/userSelected`), snapshotVal.userSelected - 1);
            }            
    
            if (index >= 0 && index < updatedUserOption.length && updatedUserOption.length > 1) {
              updatedUserOption.splice(index, 1);
            }
    
            await set(ref(database, `user/${userUid}/userOption`), updatedUserOption);
          }
    
          return { data: "User option deleted successfully" };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),

    setChangeUserOptionSelected: builder.mutation({
      async queryFn({ index, value }) {
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
            return { data: null };
          }
    
          const reference = ref(database, `user/${userUid}`);
          const snapshot = await get(reference);
          const snapshotVal = snapshot.exists() ? snapshot.val() : null;
    
          if (snapshotVal && Array.isArray(snapshotVal.userOption)) {
            let updatedUserOption = [...snapshotVal.userOption];           
    
            updatedUserOption[index] = {
              ...updatedUserOption[index],
              ...value,
            };
    
            await set(ref(database, `user/${userUid}/userOption`), updatedUserOption);
          }
    
          return { data: "User option deleted successfully" };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
    
  }),
});

export const { 
  useSetDefaultDBMutation, 
  useGetDataQuery, 
  useGetLoginStatusQuery, 
  useSetChangedUserDataMutation, 
  useSetAddUserOptionMutation,
  useSetDeleteUserOptionMutation,
  useSetChangeUserOptionSelectedMutation,
} = firebaseDBSlice;
