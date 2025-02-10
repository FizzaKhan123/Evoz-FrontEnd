import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const promotionApi = createApi({
  reducerPath: "promotionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/promotions" }),
  endpoints: (builder) => ({
    createPromotion: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
    }),
    getPromotions: builder.query({
      query: (trainerId) => `/${trainerId}`,
    }),
    updatePromotion: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deletePromotion: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreatePromotionMutation, useGetPromotionsQuery, useUpdatePromotionMutation, useDeletePromotionMutation } = promotionApi;
