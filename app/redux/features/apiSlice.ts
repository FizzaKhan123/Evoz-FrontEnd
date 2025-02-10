import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
    prepareHeaders: (headers, { getState }) => {
      const token = Cookies.get('authToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
//   tagTypes: ['TaskList', 'Task'],
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userData) => ({
        url: '/auth/signup',
        method: 'POST',
        body: userData,
      }),
      // Invalidate task cache on sign-up
    //   async onQueryStarted(_, { dispatch, queryFulfilled }) {
    //     try {
    //       await queryFulfilled;
    //       dispatch(apiSlice.util.invalidateTags([{ type: 'TaskList' }]));
    //     } catch (error) {
    //       // Type guard to check if the error is an instance of Error
    //       if (error instanceof Error) {
    //         console.error('Error during sign-up:', error.message);
    //       } else {
    //         console.error('Unknown error during sign-up');
    //       }
    //     }
    //   },
    }),
    signIn: builder.mutation({
      query: (userData) => ({
        url: '/auth/signin',
        method: 'POST',
        body: userData,
      }),
      extraOptions: {
        fixedCacheKey: 'signin', // 🔹 Assign a fixed cache key
      },
      // Invalidate the task cache once the user logs in
    //   async onQueryStarted(_, { dispatch, queryFulfilled }) {
    //     try {
    //       await queryFulfilled;
    //       dispatch(apiSlice.util.invalidateTags([{ type: 'TaskList' }]));
    //     } catch (error) {
    //        console.log("ERROR :: ");
    //       if (error instanceof Error) {
    //         console.log('Error during sign-in:', error.message);
    //       } else {
    //         console.log('Unknown error during sign-in');
    //       }
    //     }
    //   },
    }),
    uploadWorkoutVideo: builder.mutation({
      query: (formData) => ({
        url: '/workout-videos/upload',
        method: 'POST',
        body: formData,
      }),
    }),
   
   
  }),
});

export const { useSignUpMutation ,useSignInMutation ,useUploadWorkoutVideoMutation } = apiSlice;