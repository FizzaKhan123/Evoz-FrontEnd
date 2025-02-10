import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie';

export const nutritionApi = createApi({
  reducerPath: "nutritionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/nutrition-plans" ,
    prepareHeaders: (headers, { getState }) => {
        const token = Cookies.get('authToken');
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
      },
   }),
  endpoints: (builder) => ({
    createNutritionPlan: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
    }),
    getAllNutritionPlans: builder.query({
      query: () => "/",
    }),
    getTrainerNutritionPlans: builder.query({
      query: (trainerId) => `/${trainerId}`,
    }),
    deleteNutritionPlan: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateNutritionPlanMutation,
  useGetAllNutritionPlansQuery,
  useGetTrainerNutritionPlansQuery,
  useDeleteNutritionPlanMutation,
} = nutritionApi;
