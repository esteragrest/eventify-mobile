import { StyleSheet, View } from "react-native";

interface FormRowProps {
  children: React.ReactNode;
}

export const FormRow = ({ children }: FormRowProps) => {
  return <View style={styles.row}>{children}</View>;
};

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
});
