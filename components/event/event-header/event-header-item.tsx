import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

interface EventHeaderItemProps {
  children: ReactNode;
}

export const EventHeaderItem = ({ children }: EventHeaderItemProps) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 4,
  },
});
