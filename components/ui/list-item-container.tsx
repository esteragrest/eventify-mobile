import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

export interface ListItemContainerProps {
  children: ReactNode;
}

export const ListItemContainer = ({ children }: ListItemContainerProps) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#C0A2E2",
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
  },
  child: {
    flex: 1,
  },
});
