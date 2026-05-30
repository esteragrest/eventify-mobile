// import { View, Text, StyleSheet } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { selectOrganizerId, selectUserId, selectUserRole } from "@/selectors";
// import {
//   Button,
//   ContentOverlay,
//   ItemMainInfo,
//   DeleteButtons,
// } from "@/components";
// import { removeCommentAsync } from "@/actions/remove-comment-async";
// import { CLOSE_MODAL, openModal } from "@/actions";
// import { checkOwner, checkAccessRights } from "@/utils";

// interface EventCommentItemProps {
//   comment: {
//     id: number;
//     commentatorId: number;
//     commentatorFirstName: string;
//     commentatorLastName?: string;
//     commentatorPhoto?: any;
//     content: string;
//   };
//   onReply: (parentId: number | null, commentatorName: string) => void;
// }

// export const EventCommentItem = ({
//   comment,
//   onReply,
// }: EventCommentItemProps) => {
//   const {
//     id,
//     commentatorId,
//     commentatorFirstName,
//     commentatorLastName,
//     commentatorPhoto,
//     content,
//   } = comment;

//   const organizerId = useSelector(selectOrganizerId);
//   const userId = useSelector(selectUserId);
//   const userRole = useSelector(selectUserRole);
//   const dispatch = useDispatch();

//   const fullName = `${commentatorFirstName} ${commentatorLastName || ""}`;

//   const isOrganizer = checkOwner(organizerId, userId);
//   const isCommentOwnerOrAdmin = checkAccessRights(
//     commentatorId,
//     userId,
//     userRole,
//   );

//   const handleDeleteComment = (commentId: number) => {
//     dispatch(removeCommentAsync(commentId));
//     dispatch(CLOSE_MODAL);
//     onReply(null, "");
//   };

//   const onDeleteComment = (commentId: number) => {
//     dispatch(
//       openModal({
//         image: require("@/assets/images/delete.png"),
//         title: "Вы уверены, что хотите удалить этот вопрос?",
//         text: "После удаления вопрос не будет отображаться в общем списке и Вы не сможете на него ответить.",
//         children: (
//           <DeleteButtons onDelete={() => handleDeleteComment(commentId)} />
//         ),
//       }),
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <ItemMainInfo
//         itemName={fullName}
//         photo={commentatorPhoto}
//         to={`/profile/${commentatorId}`}
//       >
//         {organizerId === commentatorId && (
//           <ContentOverlay>
//             <Text style={styles.organizer}>Организатор</Text>
//           </ContentOverlay>
//         )}
//       </ItemMainInfo>

//       <Text style={styles.text}>{content}</Text>

//       <View style={styles.controlPanel}>
//         {isOrganizer && (
//           <Button
//             backgroundColor="#E0C9FF"
//             onPress={() => onReply(id, fullName)}
//           >
//             Ответить
//           </Button>
//         )}

//         {isCommentOwnerOrAdmin && (
//           <Button backgroundColor="#FFD1D1" onPress={() => onDeleteComment(id)}>
//             Удалить
//           </Button>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     backgroundColor: "#ffffff7c",
//     borderWidth: 1.5,
//     borderColor: "#C0A2E2",
//     padding: 10,
//     borderRadius: 8,
//     gap: 10,
//   },

//   text: {
//     fontSize: 14,
//     color: "#333",
//   },

//   organizer: {
//     fontSize: 12,
//     color: "#444",
//   },

//   controlPanel: {
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     gap: 10,
//   },
// });

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

