import { ReactNode } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Link } from "expo-router";

export interface ItemMainInfoProps {
  itemName: string;
  photo?: string;
  to: string;
  children?: ReactNode;
}

export const ItemMainInfo = ({
  itemName,
  photo,
  to,
  children,
}: ItemMainInfoProps) => {
  return (
    //TODO: чекнуть ошибки типов
    <Link href={to}>
      <View style={styles.container}>
        <Image
          source={
            photo ? { uri: photo } : require("../../public/img/no-photo-1.jpg")
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
    width: "100%",
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
