import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "event",
  initialState: {
    current: null,
  },
  reducers: {
    setEvent(state, action) {
      state.current = action.payload;
    },
    clearEvent(state) {
      state.current = null;
    },
  },
});

export const { setEvent, clearEvent } = eventSlice.actions;
export default eventSlice.reducer;
