import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const contactUsApi = createApi({
  reducerPath: "contactUsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    contactUs: builder.mutation({
      query: (data) => ({
        url: "/contactus",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useContactUsMutation } = contactUsApi;
