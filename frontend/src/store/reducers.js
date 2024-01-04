import { createSlice } from "@reduxjs/toolkit";

export const rootReducers = createSlice({
  name: "user",
  initialState: {
    data: {
      userId: null,
      name: "",
      email: "",
      role: "",
    },
  },

  reducers: {
    addUser: (state, action) => {
      state.data = action.payload;
    },
    destroyUser: (state) => {
      state.data = {
        userId: null,
        name: "",
        email: "",
        role: "",
      };
    },
  },
});

export const { addUser, destroyUser } = rootReducers.actions;

export default rootReducers.reducer;
