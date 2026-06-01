import { Registration } from "../types";
import { baseApi } from "./baseApi";

export const registrationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getParticipants: builder.query<Registration[], number>({
      query: (eventId) => `/api/registrations/event/${eventId}`,
    }),
  }),
});

export const { useGetParticipantsQuery } = registrationsApi;
