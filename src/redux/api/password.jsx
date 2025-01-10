import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const passwordApi = createApi({
  reducerPath: "passwordApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),

  endpoints: (builder) => ({
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/password/forgot",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ id, token, data }) => ({
        url: `/password/reset/${id}/${token}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useForgotPasswordMutation, useResetPasswordMutation } =
  passwordApi;
