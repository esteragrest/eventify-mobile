import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",

  baseQuery: fetchBaseQuery({
    //TODO: поменять ip если что
    baseUrl: "http://192.168.0.101:3000",
  }),

  endpoints: () => ({}),
});
