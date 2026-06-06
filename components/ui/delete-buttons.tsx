import { StyleSheet, View } from "react-native";
import { Button } from "./button";

interface DeleteButtonsProps {
  onDelete: () => void;
  onChancel: () => void;
}

export const DeleteButtons = ({ onDelete, onChancel }: DeleteButtonsProps) => {
  return (
    <View style={styles.container}>
      <Button backgroundColor="#E0C9FF" onPress={onChancel}>
        Отмена
      </Button>
      <Button backgroundColor="#C0A2E2" onPress={onDelete}>
        Удалить
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
});
