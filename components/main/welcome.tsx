import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
// import { useSelector } from "react-redux";
// import { selectUserRole } from "../../../selectors";
// import { isAuthorized } from "../../../utils";
import { Button } from "../ui";

export const Welcome = () => {
  //   const userRoleId = useSelector(selectUserRole);
  //   const isAuth = isAuthorized(userRoleId);

  const { width } = useWindowDimensions();

  const isMobile = width <= 767;
  const isTablet = width <= 1024 && width > 767;
  const isLarge = width >= 1701;

  let titleSize = 48;
  if (isLarge) titleSize = 60;
  else if (isTablet) titleSize = 44;
  else if (isMobile) titleSize = 32;

  return (
    <View style={[styles.container, isMobile && styles.containerMobile]}>
      <View style={[styles.textBlock, isMobile && styles.textBlockMobile]}>
        <Text style={[styles.title, { fontSize: titleSize }]}>
          Организуйте. Приглашайте. Наслаждайтесь.
        </Text>

        <Text style={styles.description}>
          Eventify помогает вам организовать любые мероприятия — от вечеринок до
          бизнес-конференций. Планируйте события, приглашайте участников,
          управляйте списком гостей и создавайте незабываемые моменты.
        </Text>

        <View style={styles.buttons}>
          {/* {!isAuth ? (
            <AuthButtons />
          ) : (
            <Button backgroundColor="#E8FF59">
              <Link href="/event/create">Создать мероприятие</Link>
            </Button>
          )} */}
          {/* TODO: добавить действие */}
          <Button backgroundColor="#C0A2E2" width={170}>
            Зарегистрироваться
          </Button>
          <Button border="2px solid #C0A2E2" width={150}>
            Войти в аккаунт
          </Button>
        </View>
      </View>
      <View style={[styles.banner, isMobile && styles.bannerMobile]}>
        <Image
          source={require("../../public/img/main-page.png")}
          style={styles.bannerImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },

  containerMobile: {
    flexDirection: "column",
  },

  textBlock: {
    width: "50%",
    paddingHorizontal: 60,
    gap: 10,
    zIndex: 10,
  },

  textBlockMobile: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  title: {
    fontWeight: "700",
    width: "100%",
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
  },

  buttons: {
    width: "50%",
    marginTop: 10,
  },

  banner: {
    width: "60%",
    height: "auto",
    position: "absolute",
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  bannerMobile: {
    width: "100%",
    height: "auto",
    position: "relative",
    marginTop: 20,
  },

  bannerImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.2,
    resizeMode: "contain",
  },
});
