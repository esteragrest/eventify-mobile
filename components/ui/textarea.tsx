import { forwardRef } from "react";
import { StyleSheet, TextInput } from "react-native";

export interface TextareaProps {
  name: string;
  id: string;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

export const Textarea = forwardRef<TextInput, TextareaProps>(
  ({ name, id, placeholder, value, onChangeText, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        multiline
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.textarea}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

const styles = StyleSheet.create({
  textarea: {
    width: "100%",
    height: 120,
    borderWidth: 2,
    borderColor: "rgb(192,162,226)",
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlignVertical: "top",
    fontSize: 14,
    backgroundColor: '#fff',
    paddingRight: 32
  },
});
