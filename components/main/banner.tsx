import { isAuthorized } from "@/utils";
import { Link } from "expo-router";
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { Button } from "../ui";

export const Banner = () => {
  const currentUserRoleId = useSelector((state: any) => state.user?.user?.roleId);
  const { width } = useWindowDimensions();
  const isMobile = width <= 480;

  const isAuth = isAuthorized(currentUserRoleId);
  const bannerLink = isAuth ? "/events/create" : "/auth/login";

  return (
    <View style={styles.container}>
      <Image
        source={require("../../public/img/main-page-3.png")}
        style={styles.image}
      />

      <View style={styles.textBlock}>
        <Text style={[styles.title, isMobile && styles.titleMobile]}>
          Станьте частью мира ярких событий!
        </Text>

        <Text
          style={[styles.description, isMobile && styles.descriptionMobile]}
        >
          Организуйте свои мероприятия или присоединяйтесь к тем, которые уже
          меняют мир. Всё это доступно в одном клике — начните создавать
          незабываемые моменты прямо сейчас!
        </Text>

        <Button backgroundColor="#E8FF59">
          <Link href={bannerLink}>Создать мероприятие</Link>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#E0C9FF",
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: "center",
    gap: 15,
    flexDirection: "column",
  },

  image: {
    width: "90%",
    height: undefined,
    aspectRatio: 1.4,
    resizeMode: "contain",
  },

  textBlock: {
    width: "100%",
    paddingHorizontal: 25,
    gap: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
  },

  titleMobile: {
    fontSize: 24,
  },

  description: {
    width: "90%",
    fontSize: 16,
    lineHeight: 20,
  },

  descriptionMobile: {
    fontSize: 14,
  },
});
