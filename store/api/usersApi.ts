// import { mapImageUrl } from "@/utils";
// import { EventItem } from "../types";
// import { baseApi } from "./baseApi";

// export const usersApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getUserProfile: builder.query<any, number | void>({
//       query: (id) => (id ? `/api/users/profile/${id}` : `/api/users/profile`),
//       transformResponse: (res: any) => ({
//         ...res,
//         user: {
//           ...res.user,
//           photo: mapImageUrl(res.user.photo),
//         },
//         activeEvents: res.activeEvents.map((event: any) => ({
//           ...event,
//           photo: mapImageUrl(event.photo),
//         })),
//         archivedEvents: res.archivedEvents.map((event: any) => ({
//           ...event,
//           photo: mapImageUrl(event.photo),
//         })),
//       }),
//     }),

//     getUserRegistrations: builder.query<EventItem[], number>({
//       query: (id) => `/api/registrations/user/${id}`,
//       transformResponse: (registrations: EventItem[]) =>
//         registrations.map((registration) => ({
//           ...registration,
//           photo: mapImageUrl(registration.photo),
//         })),
//     }),

//     removeUser: builder.mutation<{ message: string }, number>({
//       query: (id) => ({
//         url: `/api/users/${id}`,
//         method: "DELETE",
//       }),
//     }),

//     updateUser: builder.mutation<any, { id: number; data: any }>({
//       query: ({ id, data }) => {
//         const isNewPhoto = data.photo && typeof data.photo === "object";

//         if (isNewPhoto) {
//           const formData = new FormData();

//           Object.entries(data).forEach(([key, value]) => {
//             if (key === "photo") {
//               formData.append("photo", {
//                 uri: value.uri,
//                 name: "avatar.jpg",
//                 type: "image/jpeg",
//               } as any);
//             } else {
//               formData.append(key, value as any);
//             }
//           });

//           return {
//             url: `/api/users/edit/${id}`,
//             method: "PUT",
//             body: formData,
//           };
//         }

//         return {
//           url: `/api/users/edit/${id}`,
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: data,
//         };
//       },
//     }),
//   }),
// });

// export const {
//   useGetUserProfileQuery,
//   useGetUserRegistrationsQuery,
//   useRemoveUserMutation,
//   useUpdateUserMutation,
// } = usersApi;

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
      providesTags: (result, error, id) => [
        { type: "User" as const, id: id ?? "ME" },
      ],
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

    updateUser: builder.mutation<any, { id: number; data: any }>({
      query: ({ id, data }) => {
        const isNewPhoto = data.photo && typeof data.photo === "object";

        if (isNewPhoto) {
          const formData = new FormData();

          Object.entries(data as Record<string, any>).forEach(
            ([key, value]) => {
              if (key === "photo") {
                const v = value as { uri: string };
                formData.append("photo", {
                  uri: v.uri,
                  name: "avatar.jpg",
                  type: "image/jpeg",
                } as any);
              } else {
                formData.append(key, value as any);
              }
            },
          );

          return {
            url: `/api/users/edit/${id}`,
            method: "PUT",
            body: formData,
          };
        }

        return {
          url: `/api/users/edit/${id}`,
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: data,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "User" as const, id: id ?? "ME" },
      ],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useGetUserRegistrationsQuery,
  useRemoveUserMutation,
  useUpdateUserMutation,
} = usersApi;
