import { StyleSheet, Text, View } from "react-native";

interface ErrorMessageProps {
  children: string;
}

export const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#ffe2e2",
    padding: 12,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  text: {
    color: "#a10000",
    fontSize: 14,
    textAlign: "center",
  },
});
