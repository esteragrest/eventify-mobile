import { Button } from "@/components";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { EventCommentItem } from "./event-comment-item";

interface EventCommentsProps {
  comments: any[]; //TODO: мб тут тип пересмотреть заменить
  onReply: (parentId: number | null, commentatorName: string) => void;
  onDelete: (commentId: number) => void;
  userId: number;
  organizerId: number;
  userRole: string;
}

export const EventComments = ({
  comments,
  onReply,
  onDelete,
  userId,
  organizerId,
  userRole,
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
            const isOrganizer = organizerId === comment.commentatorId;
            const isCommentOwnerOrAdmin =
              comment.commentatorId === userId || userRole === "admin";

            return (
              <EventCommentItem
                key={comment.id}
                comment={comment}
                isOrganizer={isOrganizer}
                isCommentOwnerOrAdmin={isCommentOwnerOrAdmin}
                onReply={onReply}
                onDelete={onDelete}
              />
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
    paddingVertical: 15,
  },

  list: {
    maxHeight: 400,
  },
});
