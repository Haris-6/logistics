import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authorizationHeader } from "../../utils/currentUser";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      return authorizationHeader(headers, getState);
    },
  }),
  tagTypes: ["Booking"],
  endpoints: (builder) => ({
    shippInventory: builder.mutation({
      query: (data) => ({
        url: "/booking/shipped",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Booking"],
    }),


    getAllActiveAdds: builder.query({
      query: () => ({
        url: "/booking/active",
      }),
      providesTags: ["Booking"],
    }),

    completeOrder: builder.mutation({
      query: (data) => ({
        url: "/booking/complete",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const {
  useShippInventoryMutation,
  useGetAllActiveAddsQuery,
  useCompleteOrderMutation,
} = bookingApi;
