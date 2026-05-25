import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BackgroundBanner, Button } from "./ui";

interface ErrorPageProps {
  status: number;
  title: string;
  message: string;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  status,
  title,
  message,
}) => {
  return (
    <View style={styles.container}>
      <BackgroundBanner imgUrl={require("../public/img/error-page-left.svg")} />

      <View style={styles.error}>
        <Text style={styles.status}>{status}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>

        <Button backgroundColor="#E0C9FF">
          <Link href="/" style={styles.linkText}>
            На главную
          </Link>
        </Button>
      </View>

      <BackgroundBanner
        imgUrl={require("../public/img/error-page-right.svg")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //297px
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  error: {
    width: "35%",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  status: {
    fontSize: 210,
    color: "#c0a2e2",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },

  message: {
    fontSize: 16,
    textAlign: "center",
  },

  linkText: {
    color: "black",
    fontSize: 16,
  },
});
