import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SearchInput } from "./ui";

interface HeaderProps {
  onMenuPress: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuPress }) => {
  return (
    <View style={styles.container}>
        <Image
          source={require("../public/img/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      <View style={styles.rightButtons}>
        {/* <TouchableOpacity style={styles.iconButton}>
          <Image
            source={require("../public/img/search.svg")}
            style={styles.icon}
          />
        </TouchableOpacity> */}
        <SearchInput />
        <TouchableOpacity style={styles.iconButton} onPress={onMenuPress}>
          <Image
            source={require("../public/img/logo.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
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
    width: 24,
    height: 24,
  },
});
