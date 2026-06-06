import { Button } from "@/components";
import { CommentItem } from "@/store/types";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { EventCommentItem } from "./event-comment-item";
import { checkOwner } from "@/utils";

interface EventCommentsProps {
  comments: CommentItem[];
  onReply: (parentId: number | null, commentatorName: string) => void;
  onDelete: (commentId: number) => void;
  userId: number;
  userRole: string;
  isOwner: boolean
}

export const EventComments = ({
  comments,
  onReply,
  onDelete,
  userId,
  userRole,
  isOwner,
}: EventCommentsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  if (comments.length === 0) {
    return (
      <View style={styles.container}>
        <Text>
          У этого мероприятия еще нет вопросов. Задайте вопрос первым!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button backgroundColor="#E0C9FF" onPress={toggle}>
        {isOpen ? "Скрыть вопросы" : "Посмотреть вопросы"}
      </Button>

      {isOpen && (
        <ScrollView style={styles.list}>
          {comments.map((comment) => {
            const isCommentOwnerOrAdmin =
              comment.commentatorId === userId || userRole === "admin";

            return (
              <View key={comment.id} style={styles.commentWrapper}>
                <EventCommentItem
                  key={comment.id}
                  comment={comment}
                  isOrganizer={isOwner}
                  isCommentOwnerOrAdmin={isCommentOwnerOrAdmin}
                  onReply={onReply}
                  onDelete={onDelete}
                />
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 15,
  },

  list: {
    maxHeight: 400,
  },

  commentWrapper: {
    marginBottom: 8,
  },
});
