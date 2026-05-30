import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

interface PaginationButtonProps {
  isActive?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
}

export const PaginationButton = ({
  isActive,
  disabled,
  onPress,
  children,
  style,
}: PaginationButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        isActive && styles.active,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.text, isActive && styles.activeText]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },

  active: {
    backgroundColor: "#C0A2E2",
  },

  disabled: {
    opacity: 0.5,
  },

  text: {
    fontSize: 14,
    color: "#000",
  },

  activeText: {
    color: "#fff",
  },
});
