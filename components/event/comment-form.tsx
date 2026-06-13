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
