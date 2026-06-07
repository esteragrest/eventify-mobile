import { baseApi } from "./baseApi";

export const ratingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAverageRating: builder.query<{ averageRating: number | null }, number>({
      query: (eventId) => `/api/ratings/event/${eventId}/average`,
    }),

    getUserRating: builder.query<
      { isRated: boolean; rating: number | null },
      number
    >({
      query: (eventId) => `/api/ratings/userRating/event/${eventId}`,
    }),

    addRating: builder.mutation<
      any,
      { eventId: number; userId: number; rating: number }
    >({
      query: ({ eventId, userId, rating }) => ({
        url: `/api/ratings`,
        method: "POST",
        body: {
          event_id: eventId,
          user_id: userId,
          rating,
        },
      }),
      invalidatesTags: ["Rating"],
    }),
  }),
});

export const {
  useGetAverageRatingQuery,
  useGetUserRatingQuery,
  useAddRatingMutation,
} = ratingsApi;
