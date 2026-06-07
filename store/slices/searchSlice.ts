import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    phrase: "",
  },
  reducers: {
    setSearchPhrase(state, action) {
      state.phrase = action.payload;
    },
  },
});

export const { setSearchPhrase } = searchSlice.actions;
export default searchSlice.reducer;
