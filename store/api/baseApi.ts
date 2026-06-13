import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Events", "Event", "User", "ME", "Rating", "UserRating", "UserRegistrations", "EventRegistrations"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.101:3000",

    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem("token");

      if (token && token !== "null") {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: () => ({}),
});
