import { Href, Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

interface AuthLinkProps {
  text: string;
  linkText: string;
  to: Href;
}

export const AuthLink = ({ text, linkText, to }: AuthLinkProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {text}{" "}
        <Link href={to} style={styles.link}>
          {linkText}
        </Link>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: {
    color: "#26262896",
    textAlign: "center",
    fontSize: 12,
  },
  link: {
    color: "#262628",
    textDecorationLine: "underline",
  },
});
