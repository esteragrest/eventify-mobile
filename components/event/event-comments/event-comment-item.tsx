import { View, Text, StyleSheet } from "react-native";
import { Button } from "@/components";
import { ContentOverlay } from "@/components/ui/content-overlay";
import { ItemMainInfo } from "@/components/ui/item-main-info";

interface EventCommentItemProps {
  comment: {
    id: number;
    commentatorId: number;
    commentatorFirstName: string;
    commentatorLastName?: string;
    commentatorPhoto?: any;
    content: string;
  };
  isOrganizer: boolean;
  isCommentOwnerOrAdmin: boolean;
  onReply: (parentId: number, commentatorName: string) => void;
  onDelete: (commentId: number) => void;
}

export const EventCommentItem = ({
  comment,
  isOrganizer,
  isCommentOwnerOrAdmin,
  onReply,
  onDelete,
}: EventCommentItemProps) => {
  const {
    id,
    commentatorId,
    commentatorFirstName,
    commentatorLastName,
    commentatorPhoto,
    content,
  } = comment;

  const fullName = `${commentatorFirstName} ${commentatorLastName || ""}`;

  //TODO: пересмотреть логику компонента
  return (
    <View style={styles.container}>
      <ItemMainInfo
        itemName={fullName}
        photo={commentatorPhoto}
        to={`/profile/${commentatorId}`}
      >
        {isOrganizer && (
          <ContentOverlay>
            <Text style={styles.organizer}>Организатор</Text>
          </ContentOverlay>
        )}
      </ItemMainInfo>

      <Text style={styles.text}>{content}</Text>

      <View style={styles.controlPanel}>
        {isOrganizer && (
          <Button
            backgroundColor="#E0C9FF"
            onPress={() => onReply(id, fullName)}
          >
            Ответить
          </Button>
        )}

        {isCommentOwnerOrAdmin && (
          <Button backgroundColor="#FFD1D1" onPress={() => onDelete(id)}>
            Удалить
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#ffffff7c",
    borderWidth: 1.5,
    borderColor: "#C0A2E2",
    padding: 10,
    borderRadius: 8,
    gap: 10,
  },

  text: {
    fontSize: 14,
    color: "#333",
  },

  organizer: {
    fontSize: 12,
    color: "#444",
  },

  controlPanel: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
});

