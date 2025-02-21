import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../../../backEndFireBase/firebaseConfig";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword } from "firebase/auth";

export const fireBaseAuthSlice = createApi({
  reducerPath: "fireBaseAuth",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    checkEmailExists: builder.query({
      async queryFn(email) {
        try {
          const methods = await fetchSignInMethodsForEmail(auth, email);
          return { data: methods.length > 0 };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),

    signUpUser: builder.mutation({
      async queryFn({ email, password }) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          return { 
            data: {
              uid: userCredential.user.uid,
              email: userCredential.user.email,
            } 
          };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),

    loginUser: builder.mutation({
      async queryFn({ email, password }) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          return {
            data: {
              uid: userCredential.user.uid,
              email: userCredential.user.email,
            }
          }
        } catch (error) {
          return { error: error.message }
        }
      }
    })
  }),
});

export const { useLazyCheckEmailExistsQuery, useSignUpUserMutation, useLoginUserMutation } = fireBaseAuthSlice;
