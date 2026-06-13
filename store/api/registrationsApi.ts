import { Registration } from "../types";
import { baseApi } from "./baseApi";

export const registrationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getParticipants: builder.query<Registration[], number>({
      query: (eventId) => `/api/registrations/event/${eventId}`,
      providesTags: ["EventRegistrations"],
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
      invalidatesTags: ["Events", "UserRegistrations"],
    }),

    getUserRegistrationForEvent: builder.query<
      { isRegistered: boolean },
      { eventId: number }
    >({
      query: ({ eventId }) =>
        `/api/registrations/registrationForEvent/${eventId}`,
      providesTags: [{ type: "UserRegistrations", id: "ME" }],
    }),

    deleteRegistration: builder.mutation<
      { success: boolean },
      { eventId: number }
    >({
      query: ({ eventId }) => ({
        url: `/api/registrations/registrationForEvent/${eventId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserRegistrations", "EventRegistrations", "Events"],
    }),
  }),
});

export const {
  useGetParticipantsQuery,
  useRegisterForEventMutation,
  useGetUserRegistrationForEventQuery,
  useDeleteRegistrationMutation,
} = registrationsApi;
