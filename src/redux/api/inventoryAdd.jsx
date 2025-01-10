import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../utils/currentUser";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = getToken();

export const inventoryAddApi = createApi({ 
  reducerPath: "inventoryAddApi", //getting all invetory detail
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Inventory"],
  endpoints: (builder) => ({
    getAllInventory: builder.query({
      query: () => "/inventory/all",
      providesTags: ["Inventory"],
    }),

    getSingleInventory: builder.query({  //get inventory detail od single data
      query: (id) => ({
        url: `/inventory/${id}`,
      }),
    }),
    getPersonalAdds: builder.query({
      query: (authToken) => ({
        url: "/inventory/currentuser",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }),
      providesTags: ["Inventory"],
    }),
    deleteInventory: builder.mutation({  //delete inventoy detail from database
      query: ({id,authToken}) => ({
        url: `/inventory/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }),
      invalidatesTags: ["Inventory"],
    }),

    // shippInventory: builder.mutation({
    //   query: (data) => ({
    //     url: "/inventory/shipped",
    //     method: "PUT",
    //     body: data,
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }),
    //   invalidatesTags: ["Inventory"],
    // }),
    // getAllActiveAdds: builder.query({
    //   query: (authToken) => ({
    //     url: "/inventory/active",
    //     headers: {
    //       Authorization: `Bearer ${authToken}`,
    //     },
    //   }),
    //   invalidatesTags: ["Inventory"],
    // }),
  }),
});

export const {
  useGetAllInventoryQuery,
  useGetSingleInventoryQuery,
  useGetPersonalAddsQuery,
  useDeleteInventoryMutation,
  // useShippInventoryMutation,
  // useGetAllActiveAddsQuery
} = inventoryAddApi;
