import { mapImageUrl } from "@/utils";
import { EventItem, EventsResponse } from "../types/event";
import { baseApi } from "./baseApi";

export const eventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWeeklyEvents: builder.query<EventItem[], void>({
      query: () => "/api/events/weekly-events",

      transformResponse: (events: EventItem[]) =>
        events.map((event) => ({
          ...event,
          photo: mapImageUrl(event.photo),
        })),
    }),

    getEvents: builder.query<
      EventsResponse,
      { page: number; limit: number; title?: string }
    >({
      query: ({ page, limit, title }) =>
        `/api/events?limit=${limit}&page=${page}&title=${title ?? ""}`,

      transformResponse: (response: EventsResponse) => ({
        ...response,
        events: response.events.map((event) => ({
          ...event,
          photo: mapImageUrl(event.photo),
        })),
      }),
    }),
  }),
});

export const { useGetWeeklyEventsQuery, useGetEventsQuery } = eventsApi;
