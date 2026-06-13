import { mapImageUrl } from "@/utils";
import {
  DeleteEventResponse,
  EventByIdResponse,
  EventItem,
  EventsResponse,
  GetEventsParams,
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

    getEvents: builder.query<EventsResponse, GetEventsParams>({
      query: ({ page, limit, title, dateFrom, dateTo, payment, address }) => {
        const params = new URLSearchParams({
          limit: String(limit),
          page: String(page),
          title: title ?? "",
        });

        if (dateFrom) params.append("dateFrom", dateFrom);
        if (dateTo) params.append("dateTo", dateTo);
        if (payment) params.append("payment", payment);
        if (address) params.append("address", address);

        return `/api/events?${params.toString()}`;
      },
      transformResponse: (response: EventsResponse) => ({
        ...response,
        events: response.events.map((event) => ({
          ...event,
          photo: mapImageUrl(event.photo),
        })),
      }),
      providesTags: ["Events"],
    }),

    getEventById: builder.query<
      EventByIdResponse,
      { id: number; accessLink?: string }
    >({
      query: ({ id, accessLink }) => {
        const params = accessLink ? `?accessLink=${accessLink}` : "";
        return `/api/events/event/${id}${params}`;
      },

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
      providesTags: (result, error, { id }) => [{ type: "Event", id }],
    }),

    // createEvent: builder.mutation<any, any>({
    //   query: (body) => ({
    //     url: "/api/events",
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["Events", { type: "User", id: "ME" }],
    // }),

    // updateEvent: builder.mutation<any, { id: number; body: any }>({
    //   query: ({ id, body }) => ({
    //     url: `/api/events/${id}`,
    //     method: "PUT",
    //     body,
    //   }),
    //   invalidatesTags: (result, error, { id }) => [
    //     "Events",
    //     { type: "Event", id },
    //     { type: "User", id: "ME" },
    //   ],
    // }),

    createEvent: builder.mutation<any, any>({
      query: (body) => {
        const isNewPhoto = body.photo && body.photo.startsWith("file://");

        if (isNewPhoto) {
          const formData = new FormData();

          Object.entries(body).forEach(([key, value]) => {
            if (key === "photo") {
              formData.append("photo", {
                uri: value,
                name: "event.jpg",
                type: "image/jpeg",
              } as any);
            } else {
              formData.append(key, value as any);
            }
          });

          return {
            url: "/api/events",
            method: "POST",
            body: formData,
          };
        }

        return {
          url: "/api/events",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        };
      },
      invalidatesTags: ["Events", { type: "User", id: "ME" }],
    }),

    updateEvent: builder.mutation<any, { id: number; body: any }>({
      query: ({ id, body }) => {
        const isNewPhoto = body.photo && body.photo.startsWith("file://");

        if (isNewPhoto) {
          const formData = new FormData();

          Object.entries(body).forEach(([key, value]) => {
            if (key === "photo") {
              formData.append("photo", {
                uri: value,
                name: "event.jpg",
                type: "image/jpeg",
              } as any);
            } else {
              formData.append(key, value as any);
            }
          });

          return {
            url: `/api/events/${id}`,
            method: "PUT",
            body: formData,
          };
        }

        return {
          url: `/api/events/${id}`,
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        "Events",
        { type: "Event", id },
        { type: "User", id: "ME" },
      ],
    }),

    deleteEvent: builder.mutation<DeleteEventResponse, number>({
      query: (id) => ({
        url: `/api/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events", { type: "User", id: "ME" }],
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
