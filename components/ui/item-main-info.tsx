import { Href, Link } from "expo-router";
import { ReactNode } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export interface ItemMainInfoProps {
  itemName: string;
  photo?: string;
  to: Href;
  children?: ReactNode;
}

export const ItemMainInfo = ({
  itemName,
  photo,
  to,
  children,
}: ItemMainInfoProps) => {
  return (
    <Link href={to} asChild>
      <View style={styles.container}>
        <Image
          source={
            photo ? { uri: photo } : require("@/assets/img/no-photo-1.jpg")
          }
          style={styles.avatar}
        />

        <View style={styles.details}>
          <Text style={styles.name}>{itemName}</Text>
          {children}
        </View>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 5,
    width: "auto",
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 35,
    resizeMode: "cover",
  },
  details: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
  },
});
