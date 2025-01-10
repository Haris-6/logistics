import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    storeUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { storeUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
