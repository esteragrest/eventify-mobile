import { createSlice } from "@reduxjs/toolkit";

//TODO: Добавить тип пользователя
const initialState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
    updateUserData(state, action) {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
  },
});

export const { setUser, setToken, logout, updateUserData } = userSlice.actions;
export default userSlice.reducer;
