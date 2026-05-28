import { StyleSheet, useWindowDimensions, View } from "react-native";

interface FormRowProps {
  children: React.ReactNode;
}

export const FormRow = ({ children }: FormRowProps) => {
  const { width } = useWindowDimensions();

  //TODO: скорее всего убрать эти стили, пересмотреть при верстке форм
  const isMobile = width <= 767;

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
