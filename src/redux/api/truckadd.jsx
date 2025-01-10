import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../utils/currentUser";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = getToken();

export const truckAddApi = createApi({
  reducerPath: "truckAddApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Truck"],
  endpoints: (builder) => ({
    getAllLoaders: builder.query({
      query: () => "/loader/all",
      providesTags: ["Truck"],
    }),

    getSingleLoader: builder.query({
      query: (id) => ({
        url: `/loader/${id}`,
      }),
    }),

    myPersonalAdds: builder.query({
      query: (authToken) => ({
        url: "/loader/currentuser",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }),
      providesTags:["Truck"]
    }),

    deleteLoader: builder.mutation({
      query: (id) => ({
        url: `/loader/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Truck"],
    }),
  }),
});

export const {
  useGetAllLoadersQuery,
  useGetSingleLoaderQuery,
  useMyPersonalAddsQuery,
  useDeleteLoaderMutation,
} = truckAddApi;
