import { TextInput, View, StyleSheet } from "react-native";

interface SimpleInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  width?: number | string;
}

export const SimpleInput = ({
  value,
  onChangeText,
  placeholder,
  width = "100%",
}: SimpleInputProps) => {
  return (
    <View style={[styles.wrapper, { width }]}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#777"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "rgb(192, 162, 226)",
    paddingHorizontal: 10,
    fontSize: 12,
    backgroundColor: "#FFFFFF",
  },
});
