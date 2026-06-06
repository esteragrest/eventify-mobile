import { DeleteEventResponse } from "../types";
import { baseApi } from "./baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    removeUser: builder.mutation<DeleteEventResponse, number>({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useRemoveUserMutation } = usersApi;
