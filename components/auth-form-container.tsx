import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

interface AuthFormContainerProps {
  children: React.ReactNode;
}

export const AuthFormContainer = ({ children }: AuthFormContainerProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.form}>{children}</View>

      <Link href="/" style={styles.backLink}>
        Вернуться на главную
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    minHeight: 500,
    backgroundColor: "#ffffff",
    borderWidth: 3,
    borderColor: "#c0a2e2",
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 28,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
    alignSelf: "center",
  },

  form: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  backLink: {
    opacity: 0.7,
    fontSize: 14,
    marginTop: 10,
  },
});
