import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CustomCheckboxProps {
  content: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const CustomCheckbox = ({
  content,
  defaultChecked = false,
  onChange,
}: CustomCheckboxProps) => {
  const [checked, setChecked] = useState(defaultChecked);

  const toggle = () => {
    const newValue = !checked;
    setChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={toggle}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && (
          <Image
            source={require("@/assets/img/check-mark.png")}
            style={styles.checkIcon}
          />
        )}
      </View>

      <Text style={styles.text}>{content}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#C0A2E2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },

  checkboxChecked: {
    backgroundColor: "#fff",
  },

  checkIcon: {
    width: 13,
    height: 13,
    tintColor: "#C0A2E2",
  },

  text: {
    fontSize: 14,
    color: "#262628",
  },
});
