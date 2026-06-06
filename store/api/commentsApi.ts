import { mapImageUrl } from "@/utils";
import { baseApi } from "./baseApi";

export const commentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //TODO: посмотреть тип тела запроса
    addComment: builder.mutation<
      any,
      {
        eventId: number;
        userId: number;
        parentId: number | null;
        content: string;
      }
    >({
      query: ({ eventId, userId, parentId, content }) => ({
        url: "/api/comments",
        method: "POST",
        body: {
          event_id: eventId,
          user_id: userId,
          parent_id: parentId,
          content,
        },
      }),
      transformResponse: (newComment: any) => ({
        ...newComment,
        commentatorPhoto: mapImageUrl(newComment?.commentatorPhoto),
      }),
      invalidatesTags: (result, error, { eventId }) => [
        "Events",
        { type: "Event", eventId },
      ],
    }),
  }),
});

export const { useAddCommentMutation } = commentsApi;
