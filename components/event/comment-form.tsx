// import { useEffect, useRef, useState } from "react";
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// interface CommentsFormProps {
//   parentId?: number | null;
//   commentatorName?: string;
//   onAddComment: (comment: { parentId: number | null; text: string }) => void;
// }

// export const CommentsForm = ({
//   parentId = null,
//   commentatorName,
//   onAddComment,
// }: CommentsFormProps) => {
//   const [newComment, setNewComment] = useState("");
//   const inputRef = useRef<TextInput>(null);

//   useEffect(() => {
//     if (parentId && commentatorName) {
//       inputRef.current?.focus();
//       setNewComment(commentatorName);
//     }
//   }, [parentId, commentatorName]);

//   const handleSend = () => {
//     if (!newComment.trim()) return;

//     onAddComment({
//       parentId,
//       text: newComment.trim(),
//     });

//     setNewComment("");
//   };

//   //TODO: мб заменить на Textarea
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Задайте вопрос организатору:</Text>

//       <View style={styles.form}>
//         <TextInput
//           ref={inputRef}
//           style={styles.input}
//           placeholder="Оставьте свой вопрос..."
//           placeholderTextColor="#777"
//           multiline
//           value={newComment}
//           onChangeText={setNewComment}
//         />

//         <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
//           <Image
//             source={require("../../assets/img/send-a-comment.png")}
//             style={styles.sendIcon}
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     gap: 12,
//     marginTop: 20,
//   },

//   title: {
//     fontSize: 16,
//     fontWeight: "600",
//   },

//   form: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     gap: 10,
//   },

//   input: {
//     flex: 1,
//     minHeight: 80,
//     borderWidth: 1,
//     borderColor: "rgb(192,162,226)",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     fontSize: 14,
//     backgroundColor: "#fff",
//     textAlignVertical: "top",
//   },

//   sendButton: {
//     width: 45,
//     height: 45,
//     borderRadius: 8,
//     backgroundColor: "#C0A2E2",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   sendIcon: {
//     width: 22,
//     height: 22,
//     resizeMode: "contain",
//   },
// });

import { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { Textarea } from "@/components/ui/textarea";

interface CommentsFormProps {
  parentId?: number | null;
  commentatorName?: string;
  onAddComment: (comment: { parentId: number | null; text: string }) => void;
}

export const CommentsForm = ({
  parentId = null,
  commentatorName,
  onAddComment,
}: CommentsFormProps) => {
  const [newComment, setNewComment] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (parentId && commentatorName) {
      inputRef.current?.focus();
      setNewComment(commentatorName);
    }
  }, [parentId, commentatorName]);

  const handleSend = () => {
    if (!newComment.trim()) return;

    onAddComment({
      parentId,
      text: newComment.trim(),
    });

    setNewComment("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Задайте вопрос организатору:</Text>

      <View style={styles.textareaWrapper}>
        <Textarea
          ref={inputRef}
          name="comment"
          id="comment"
          placeholder="Оставить вопрос..."
          value={newComment}
          onChangeText={setNewComment}
          // style={styles.textarea}
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Image
            source={require("../../assets/img/send-a-comment.png")}
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  textareaWrapper: {
    position: "relative",
    width: "100%",
  },

  textarea: {
    width: "100%",
    minHeight: 120,
    borderWidth: 2,
    borderColor: "rgb(192,162,226)",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    paddingRight: 50,
    textAlignVertical: "top",
    fontSize: 16,
    backgroundColor: "#fff",
  },

  sendButton: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  sendIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});

