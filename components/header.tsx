import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { SearchInput } from "./ui";

interface HeaderProps {
  onMenuPress: () => void;
}

export const Header = ({ onMenuPress }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../public/img/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <SearchInput />
      <View style={styles.rightButtons}>
        <TouchableOpacity style={styles.iconButton} onPress={onMenuPress}>
          <Image
            source={require("../public/img/burger-menu-1.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 95,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: "#FCF7FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 36,
    height: 36,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  rightButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 16,
  },
  icon: {
    width: 20,
    height: 10,
  },
});
