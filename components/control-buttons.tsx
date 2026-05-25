import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { ControlButton } from "./ui";

interface ControlButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const ControlButtons: React.FC<ControlButtonsProps> = ({
  onEdit,
  onDelete,
}) => {
  return (
    <View style={styles.container}>
      {/* //TODO: заменить на качественные картинки */}
      <ControlButton onPress={onEdit}>
        <Image
          source={require("../public/img/control-edit.png")}
          style={styles.editIcon}
        />
      </ControlButton>

      <ControlButton onPress={onDelete}>
        <Image
          source={require("../public/img/control-delete.png")}
          style={styles.deleteIcon}
        />
      </ControlButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 5,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  deleteIcon: {
    width: 18,
    height: 20,
  },
});
