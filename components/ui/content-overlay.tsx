import { StyleSheet, View } from "react-native";

interface ContentOverlayProps {
  children: React.ReactNode;
}

export const ContentOverlay = ({ children }: ContentOverlayProps) => {
  return <View style={styles.overlay}>{children}</View>;
};

const styles = StyleSheet.create({
  overlay: {
    opacity: 0.5,
  },
});
