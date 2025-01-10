import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; //it is use to create an API slice and define base queries.
import { authorizationHeader } from "../../utils/currentUser";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const chatApi = createApi({
  reducerPath: "chatApi", //The key under which this API slice's reducer will be stored in the Redux state.
  baseQuery: fetchBaseQuery({ // Defines how to fetch data, using fetchBaseQuery with the base URL and header preparation.
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => { //A function to set up headers, typically for authorization, using the authorizationHeader function.
      return authorizationHeader(headers, getState);
    },
  }),
  tagTypes: ["chat", "UserChats"], 
  endpoints: (builder) => ({
    sendMessage: builder.mutation({  //An endpoint for sending a message
      query: ({ id, data }) => ({
        url: `/message/send/${id}`,
        method: "POST",
        body: { message: data },
      }),
      invalidatesTags: ["UserChats"], 
    }),
    getMessages: builder.query({  //An endpoint for fetching messages.
      query: (id) => `/message/${id}`,
      providesTags: (result, error, id) => [{ type: 'chat', id }],
    }),
    getUserChats: builder.query({  //An endpoint for fetching user-specific chats
      query: () => "/message/user",
      providesTags: ["UserChats"], 
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetUserChatsQuery,
  useGetMessagesQuery,
} = chatApi;
