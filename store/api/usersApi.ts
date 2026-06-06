// import { DeleteEventResponse } from "../types";
// import { baseApi } from "./baseApi";

// export const usersApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     removeUser: builder.mutation<DeleteEventResponse, number>({
//       query: (id) => ({
//         url: `/api/users/${id}`,
//         method: "DELETE",
//       }),
//     }),
//   }),
// });

// export const { useRemoveUserMutation } = usersApi;

import { mapImageUrl } from "@/utils";
import { EventItem } from "../types";
import { baseApi } from "./baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<any, number | void>({
      query: (id) => (id ? `/api/users/profile/${id}` : `/api/users/profile`),
      transformResponse: (res: any) => ({
        ...res,
        user: {
          ...res.user,
          photo: mapImageUrl(res.user.photo),
        },
        activeEvents: res.activeEvents.map((event: any) => ({
          ...event,
          photo: mapImageUrl(event.photo),
        })),
        archivedEvents: res.archivedEvents.map((event: any) => ({
          ...event,
          photo: mapImageUrl(event.photo),
        })),
      }),
    }),

    getUserRegistrations: builder.query<EventItem[], number>({
      query: (id) => `/api/registrations/user/${id}`,
      transformResponse: (registrations: EventItem[]) =>
        registrations.map((registration) => ({
          ...registration,
          photo: mapImageUrl(registration.photo),
        })),
    }),

    removeUser: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useGetUserRegistrationsQuery,
  useRemoveUserMutation,
} = usersApi;
