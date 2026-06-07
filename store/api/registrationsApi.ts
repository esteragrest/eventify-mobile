import { mapImageUrl } from "@/utils";
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
      transformResponse: (participants: Registration[]) =>
        participants.map((participant: Registration) => ({
          ...participant,
          photo: mapImageUrl(participant?.photo || ""),
        })),
      invalidatesTags: (result, error, { eventId }) => [
        "Events",
        { type: "Event", eventId },
      ],
    }),
  }),
});

export const { useGetParticipantsQuery, useRegisterForEventMutation } =
  registrationsApi;
