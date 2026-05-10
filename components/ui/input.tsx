import { forwardRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface InputProps {
  type?: string;
  name?: string;
  placeholder?: string;
  width?: number | `${number}%` | "auto";
  value?: string;
  onChangeText?: (text: string) => void;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    { type, name, placeholder, width = "100%", value, onChangeText, ...props },
    ref,
  ) => {
    return (
      <View style={[styles.wrapper, { width }]}>
        <TextInput
          ref={ref}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#777"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={type === "password"}
          {...props}
        />
      </View>
    );
  },
);

Input.displayName = "Input";

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    height: 35,
    borderWidth: 1,
    borderColor: "rgb(192, 162, 226)",
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 12,
    backgroundColor: "#FFFFFF",
  },
});
