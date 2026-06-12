import { Registration } from "../types";
import { baseApi } from "./baseApi";

export const registrationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getParticipants: builder.query<Registration[], number>({
      query: (eventId) => `/api/registrations/event/${eventId}`,
    }),

    registerForEvent: builder.mutation<
      any,
      {
        eventId: number;
        userId: number;
        firstName: string;
        lastName: string | null;
        email: string;
        phone: string;
        participants: number;
      }
    >({
      query: ({
        eventId,
        userId,
        firstName,
        lastName,
        email,
        phone,
        participants,
      }) => ({
        url: "/api/registrations",
        method: "POST",
        body: {
          event_id: eventId,
          user_id: userId,
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          participants_count: participants,
        },
      }),
      invalidatesTags: (result, error, { eventId }) => [
        "Events",
        { type: "Event", id: eventId },
        "UserRegistrations",
      ],
    }),

    getUserRegistrationForEvent: builder.query<
      { isRegistered: boolean },
      { eventId: number }
    >({
      query: ({ eventId }) =>
        `/api/registrations/registrationForEvent/${eventId}`,
      transformResponse: (res: any) => ({
        isRegistered: res?.isRegistered ?? false,
      }),
      providesTags: [{ type: "UserRegistrations", id: "ME" }],
    }),
  }),
});

export const {
  useGetParticipantsQuery,
  useRegisterForEventMutation,
  useGetUserRegistrationForEventQuery,
} = registrationsApi;
