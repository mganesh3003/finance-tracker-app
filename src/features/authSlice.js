import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedInUser: {},
};

export const loginSlice = createSlice({
  name: "loggedInUser",
  initialState,
  reducers: {
    handleLoggedIn: (state, action) => {
      state.loggedInUser = action.payload;
    },
    handleLoggedOut : (state) => {
      state.loggedInUser = {};
    }
  },
});

export const { handleLoggedIn, handleLoggedOut } = loginSlice.actions;
export default loginSlice.reducer;
