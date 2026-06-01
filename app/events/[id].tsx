import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { useGetEventByIdQuery } from "@/store/api/eventsApi";
import { useGetParticipantsQuery } from "@/store/api/registrationsApi";

import { useSelector } from "react-redux";

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
  checkAccessRights,
  checkOwner,
  isAuthorized,
} from "@/utils";

import { hasEventPassed } from "./utils";

export default function EventScreen() {
  const { id } = useLocalSearchParams();
  const eventId = Number(id);


  const user = useSelector((state: any) => state.user.user);
  const userId = user?.id ?? null;
  const userRoleId = user?.roleId ?? null;

  const { data, isLoading, error } = useGetEventByIdQuery(eventId);
  const { event, comments } = data ?? {};

  const { data: participants, isLoading: isLoadingParticipants } =
    useGetParticipantsQuery(eventId);

  const [parentId, setParentId] = useState<number | null>(null);
  const [commentatorName, setCommentatorName] = useState("");

  const handleReply = (parentId: number | null, commentatorName: string) => {
    setParentId(parentId);
    setCommentatorName(commentatorName);
  };

  const handleAddComment = (comment: {
    parentId: number | null;
    text: string;
  }) => {
    console.log("NEW COMMENT (FAKE):", comment);
  };

  const handleDeleteComment = (commentId: number) => {
    console.log("DELETE COMMENT (FAKE):", commentId);
  };

  const isAuth = isAuthorized(userRoleId);
  const accessRights = event
    ? checkAccessRights(event.organizerId, userId, userRoleId)
    : false;
  const isOwner = event ? checkOwner(event.organizerId, userId) : false;
  const isPastEvent = event?.eventDate
    ? hasEventPassed(event.eventDate)
    : false;

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
                  comments={comments || []}
                  onReply={handleReply}
                  onDelete={handleDeleteComment}
                  userId={userId ?? 0}
                  organizerId={event.organizerId}
                  userRole={userRoleId ?? ""}
                />

                {isAuth && !isOwner && !isPastEvent && (
                  <EventRegistrationForm eventId={eventId} />
                )}

                {isAuth && isPastEvent && <Rating eventId={eventId} />}
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
