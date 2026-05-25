import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

interface ControlButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
}

export const ControlButton: React.FC<ControlButtonProps> = ({
  onPress,
  children,
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 6,
  },
});
