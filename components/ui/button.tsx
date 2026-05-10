import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

interface ButtonProps {
  backgroundColor?: string;
  border?: string;
  children: React.ReactNode;
  onPress?: () => void;
  width?: number | `${number}%` | "auto";
  disabled?: boolean;
}

export const Button = ({
  backgroundColor = "transparent",
  border,
  children,
  onPress,
  width = "auto",
  disabled = false,
}: ButtonProps) => {
  const dynamicStyle: ViewStyle = {
    backgroundColor,
    width,
    opacity: disabled ? 0.5 : 1,
  };

  if (border) {
    const [widthValue, styleValue, colorValue] = border.split(" ");
    dynamicStyle.borderWidth = Number(widthValue.replace("px", ""));
    dynamicStyle.borderColor = colorValue;
    dynamicStyle.borderStyle = styleValue as "solid" | "dotted" | "dashed";
  }

  return (
    <TouchableOpacity
      style={[styles.button, dynamicStyle]}
      onPress={disabled ? undefined : onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
  },
});
