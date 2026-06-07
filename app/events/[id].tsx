import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import { useAddCommentMutation } from "@/store/api/commentsApi";
import { useGetEventByIdQuery } from "@/store/api/eventsApi";
import { useGetParticipantsQuery } from "@/store/api/registrationsApi";

import {
  CommentsForm,
  EventComments,
  EventContent,
  EventHeader,
  EventRegistrationForm,
  ListOfParticipants,
  Rating,
} from "@/components/event";

import { Loader, PrivateContent } from "@/components";
import {
  useGetUserRatingQuery,
  useGetUserRegistrationsQuery,
} from "@/store/api";
import { checkAccessRights, checkOwner, isAuthorized } from "@/utils";
import { hasEventPassed } from "./utils";

// export default function EventScreen() {
//   const { id } = useLocalSearchParams();
//   const eventId = Number(id);

//   //TODO: мб заменить на вынесенный селектор
//   const user = useSelector((state: any) => state.user.user);
//   const userId = user?.id ?? null;
//   const userRoleId = user?.roleId ?? null;

//   const { data, isLoading, error } = useGetEventByIdQuery(eventId);
//   const { event, comments: initialComments } = data ?? {};

//   const { data: participants, isLoading: isLoadingParticipants } =
//     useGetParticipantsQuery(eventId);

//   const [addComment] = useAddCommentMutation();

//   const [localComments, setLocalComments] = useState(initialComments ?? []);
//   const [parentId, setParentId] = useState<number | null>(null);
//   const [commentatorName, setCommentatorName] = useState("");

//   useEffect(() => {
//     if (initialComments) setLocalComments(initialComments);
//   }, [initialComments]);

//   const handleReply = (parentId: number | null, commentatorName: string) => {
//     setParentId(parentId);
//     setCommentatorName(commentatorName);
//   };

//   const handleAddComment = async ({
//     parentId,
//     text,
//   }: {
//     parentId: number | null;
//     text: string;
//   }) => {
//     try {
//       const newComment = await addComment({
//         eventId,
//         userId,
//         parentId,
//         content: text,
//       }).unwrap();

//       setLocalComments((prev) => [...prev, newComment]);

//       setParentId(null);
//       setCommentatorName("");
//     } catch (err) {
//       console.log("Ошибка добавления комментария:", err);
//     }
//   };

//   const handleDeleteComment = (commentId: number) => {
//     console.log("DELETE COMMENT (TODO):", commentId);
//   };

//   const isAuth = isAuthorized(userRoleId);
//   const accessRights = event
//     ? checkAccessRights(event.organizerId, userId, userRoleId)
//     : false;
//   const isOwner = event ? checkOwner(event.organizerId, userId) : false;
//   const isPastEvent = event?.eventDate
//     ? hasEventPassed(event.eventDate)
//     : false;

//   return (
//     <PrivateContent error={(error as any)?.data?.error}>
//       <ScrollView contentContainerStyle={styles.container}>
//         {isLoading || !event ? (
//           <Loader />
//         ) : (
//           <>
//             <EventHeader event={event} accessRights={accessRights} />

//             <View style={styles.overview}>
//               <EventContent event={event} />

//               <View style={styles.interactive}>
//                 {isAuth && (
//                   <CommentsForm
//                     parentId={parentId}
//                     commentatorName={commentatorName}
//                     onAddComment={handleAddComment}
//                   />
//                 )}

//                 <EventComments
//                   comments={localComments}
//                   onReply={handleReply}
//                   onDelete={handleDeleteComment}
//                   userId={userId ?? 0}
//                   isOwner={isOwner}
//                   userRole={userRoleId ?? ""}
//                 />

//                 {isAuth && !isOwner && !isPastEvent && (
//                   <EventRegistrationForm eventId={eventId} />
//                 )}

//                 {isAuth && isPastEvent && <Rating eventId={eventId} />}
//               </View>
//             </View>

//             {accessRights && (
//               <ListOfParticipants
//                 participants={participants ?? []}
//                 isLoading={isLoadingParticipants}
//               />
//             )}
//           </>
//         )}
//       </ScrollView>
//     </PrivateContent>
//   );
// }

export default function EventScreen() {
  const { id } = useLocalSearchParams();
  const eventId = Number(id);

  const user = useSelector((state: any) => state.user.user);
  const userId = user?.id ?? null;
  const userRoleId = user?.roleId ?? null;

  const { data, isLoading, error } = useGetEventByIdQuery(eventId);
  const { event, comments: initialComments } = data ?? {};

  const { data: participants, isLoading: isLoadingParticipants } =
    useGetParticipantsQuery(eventId);

  const { data: userRegistrations } = useGetUserRegistrationsQuery(userId!, {
    skip: !userId,
  });

  const isRegistered =
    userRegistrations?.some((r) => r.id === eventId) ?? false;

  const { data: userRating } = useGetUserRatingQuery(eventId, {
    skip: !userId,
  });

  const [addComment] = useAddCommentMutation();

  const [localComments, setLocalComments] = useState(initialComments ?? []);
  const [parentId, setParentId] = useState<number | null>(null);
  const [commentatorName, setCommentatorName] = useState("");

  useEffect(() => {
    if (initialComments) setLocalComments(initialComments);
  }, [initialComments]);

  const handleReply = (parentId: number | null, commentatorName: string) => {
    setParentId(parentId);
    setCommentatorName(commentatorName);
  };

  const handleAddComment = async ({ parentId, text }: any) => {
    try {
      const newComment = await addComment({
        eventId,
        userId,
        parentId,
        content: text,
      }).unwrap();

      setLocalComments((prev) => [...prev, newComment]);

      setParentId(null);
      setCommentatorName("");
    } catch (err) {
      console.log("Ошибка добавления комментария:", err);
    }
  };

  const handleDeleteComment = (commentId: number) => {
    console.log("DELETE COMMENT (TODO):", commentId);
  };

  const isAuth = isAuthorized(userRoleId);
  const accessRights = event
    ? checkAccessRights(event.organizerId, userId, userRoleId)
    : false;
  const isOwner = event ? checkOwner(event.organizerId, userId) : false;
  const isPastEvent = event?.eventDate
    ? hasEventPassed(event.eventDate)
    : false;

  const canRate = isAuth && isPastEvent && isRegistered && !userRating?.isRated;

  return (
    <PrivateContent error={(error as any)?.data?.error}>
      <ScrollView contentContainerStyle={styles.container}>
        {isLoading || !event ? (
          <Loader />
        ) : (
          <>
            <EventHeader event={event} accessRights={accessRights} />

            <View style={styles.overview}>
              <EventContent event={event} />

              <View style={styles.interactive}>
                {isAuth && (
                  <CommentsForm
                    parentId={parentId}
                    commentatorName={commentatorName}
                    onAddComment={handleAddComment}
                  />
                )}

                <EventComments
                  comments={localComments}
                  onReply={handleReply}
                  onDelete={handleDeleteComment}
                  userId={userId ?? 0}
                  isOwner={isOwner}
                  userRole={userRoleId ?? ""}
                />

                {isAuth && !isOwner && !isPastEvent && (
                  <EventRegistrationForm eventId={eventId} />
                )}

                {canRate && <Rating eventId={eventId} userId={userId} />}
              </View>
            </View>

            {accessRights && (
              <ListOfParticipants
                participants={participants ?? []}
                isLoading={isLoadingParticipants}
              />
            )}
          </>
        )}
      </ScrollView>
    </PrivateContent>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  overview: {
    flexDirection: "column",
    gap: 20,
  },
  interactive: {
    gap: 20,
  },
});
