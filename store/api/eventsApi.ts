import { mapImageUrl } from "@/utils";
import { EventByIdResponse, EventItem, EventsResponse } from "../types";
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

    getEventById: builder.query<EventByIdResponse, number>({
      query: (id) => `/api/events/event/${id}`,

      transformResponse: (res: EventByIdResponse) => ({
        event: {
          ...res.event,
          photo: mapImageUrl(res.event.photo),
        },

        comments: res.comments.map((c) => ({
          ...c,
          commentatorPhoto: mapImageUrl(c.commentatorPhoto),
        })),
      }),
    }),
  }),
});

export const {
  useGetWeeklyEventsQuery,
  useGetEventsQuery,
  useGetEventByIdQuery,
} = eventsApi;
