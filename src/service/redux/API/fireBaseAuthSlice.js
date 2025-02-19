import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../../../backEndFireBase/fireBaseAuth";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";

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
              displayName: userCredential.user.displayName,
            } 
          };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
  }),
});

export const { useCheckEmailExistsQuery, useSignUpUserMutation } = fireBaseAuthSlice;
