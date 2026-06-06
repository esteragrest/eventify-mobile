import { isAuthorized } from "@/utils";
import { Link } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { Button } from "./button";

interface SideMenuProps {
  onClose: () => void;
}

export const SideMenu = ({ onClose }: SideMenuProps) => {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const currentUser = useSelector((state: any) => state.user.user);
  const isAuth = isAuthorized(currentUser?.id);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  };

  const profileLink = isAuth ? "/profile" : "/auth/login";

  return (
    <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
      <Pressable style={StyleSheet.absoluteFill} onPress={closeMenu} />
      <Animated.View
        style={[
          styles.menu,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
          <Image
            source={require("../../public/img/burger-menu-2.png")}
            style={{ width: 20, height: 10 }}
          />
        </TouchableOpacity>

        {/* TODO: мь вынести в компонент */}
        <View style={styles.nav}>
          <Link href="/" asChild>
            <Text style={styles.navItem}>Главная</Text>
          </Link>

          <Link href="/events" asChild>
            <Text style={styles.navItem}>Мероприятия</Text>
          </Link>

          <Link href={profileLink} asChild>
            <Text style={styles.navItem}>Профиль</Text>
          </Link>
        </View>

        <View style={styles.buttons}>
          <Link href="/auth/register" asChild>
            <Button backgroundColor="#C0A2E2" width={170}>
              Зарегистрироваться
            </Button>
          </Link>

          <Link href="/auth/login" asChild>
            <Button border="2px solid #C0A2E2" width={150}>
              Войти в аккаунт
            </Button>
          </Link>
        </View>
      </Animated.View>
    </Animated.View>
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
    width: "75%",
    height: "100%",
    backgroundColor: "#FCF7FF",
    paddingTop: 50,
    paddingBottom: 50,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    position: "absolute",
    right: 0,
    top: 0,

    zIndex: 999,
    elevation: 20,
  },
  closeButton: {
    position: "absolute",
    top: 55,
    right: 20,
  },
  nav: {
    marginTop: 20,
    gap: 9,
  },
  navItem: {
    fontSize: 14,
  },
  buttons: {
    marginTop: 40,
    gap: 8,
  },
});
