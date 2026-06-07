import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import eventReducer from "./slices/eventSlice";
import searchReducer from "./slices/searchSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer,
    search: searchReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
