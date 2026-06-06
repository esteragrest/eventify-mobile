import { mapImageUrl } from "@/utils";
import {
  DeleteEventResponse,
  EventByIdResponse,
  EventItem,
  EventsResponse,
} from "../types";
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
      providesTags: ["Events"],
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
      providesTags: ["Events"],
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
      providesTags: (result, error, id) => [{ type: "Event", id }],
    }),

    createEvent: builder.mutation<any, any>({
      query: (body) => ({
        url: "/api/events",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Events"],
    }),

    updateEvent: builder.mutation<any, { id: number; body: any }>({
      query: ({ id, body }) => ({
        url: `/api/events/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Events",
        { type: "Event", id },
      ],
    }),

    deleteEvent: builder.mutation<DeleteEventResponse, number>({
      query: (id) => ({
        url: `/api/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"],
    }),
  }),
});

export const {
  useGetWeeklyEventsQuery,
  useGetEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventsApi;
