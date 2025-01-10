import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";  //this is use to send login or signup data to backend
const BASE_URL = import.meta.env.VITE_BASE_URL;//fetchbasequery allows you to easily make HTTP requests, such as GET, POST, PUT, and DELETE

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({   
    createUser: builder.mutation({   //for send data to creating new user account
      query: (data) => ({
        url: "/user/signup",
        method: "POST",
        body: data,
      }),
    }),

    loginUser: builder.mutation({  //for login user and check authenticationn
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useLoginUserMutation } = userApi;
