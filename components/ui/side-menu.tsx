import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SideMenuProps {
  onClose: () => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ onClose }) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Image
            source={require("../../public/img/cross.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>

        <View style={styles.nav}>
          <Text style={styles.navItem}>Главная</Text>
          <Text style={styles.navItem}>Мероприятия</Text>
          <Text style={styles.navItem}>Профиль</Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={[styles.button, styles.primary]}>
            <Text style={styles.buttonText}>Зарегистрироваться</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.secondary]}>
            <Text style={styles.buttonText}>Войти в аккаунт</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  menu: {
    width: "70%",
    height: "100%",
    backgroundColor: "#E0C9FF",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  nav: {
    marginTop: 20,
    gap: 20,
  },
  navItem: {
    fontSize: 20,
    fontWeight: "600",
  },
  buttons: {
    marginTop: 40,
    gap: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  primary: {
    backgroundColor: "#C0A2E2",
  },
  secondary: {
    borderWidth: 2,
    borderColor: "#C0A2E2",
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
  },
});
