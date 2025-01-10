import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/user";
import { setupListeners } from "@reduxjs/toolkit/query";
import { truckAddApi } from "./api/truckadd";
import { inventoryAddApi } from "./api/inventoryAdd";
import { chatApi } from "./api/chatApi";
import currentUserReducer from "./slice/currentUser";
import { bookingApi } from "./api/booking";
import { passwordApi } from "./api/password";
import { contactUsApi } from "./api/contactUs";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [truckAddApi.reducerPath]: truckAddApi.reducer,
    [inventoryAddApi.reducerPath]: inventoryAddApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [passwordApi.reducerPath]: passwordApi.reducer,
    [contactUsApi.reducerPath]: contactUsApi.reducer,
    currentUser: currentUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      truckAddApi.middleware,
      inventoryAddApi.middleware,
      bookingApi.middleware,
      chatApi.middleware,
      passwordApi.middleware,
      contactUsApi.middleware
    ),
});

setupListeners(store.dispatch);
