import { useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export const SearchInput = () => {
  const [value, setValue] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder="Найти мероприятие..."
        placeholderTextColor="#00000060"
      />

      <TouchableOpacity style={styles.iconButton}>
        <Image
          source={require("../../public/img/search-1.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 232,
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  input: {
    flex: 1,
    height: 32,
    borderWidth: 1,
    borderColor: "rgb(192, 162, 226)",
    paddingLeft: 10,
    paddingRight: 40,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 12,
    backgroundColor: "transparent",
    color: "#000",
  },
  iconButton: {
    position: "absolute",
    right: 0,
    padding: 4,
    overflow: "visible",
  },
  icon: {
    width: 20,
    height: 20,
  },
});
