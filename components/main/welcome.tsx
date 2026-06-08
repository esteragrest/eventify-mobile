import { Image, StyleSheet, Text, View } from "react-native";

export const Welcome = () => {
  return (
    <View style={[styles.container, styles.containerMobile]}>
      <View style={[styles.textBlock, styles.textBlockMobile]}>
        <Text style={[styles.title]}>
          Организуйте. Приглашайте. Наслаждайтесь.
        </Text>

        <Text style={styles.description}>
          Eventify помогает вам организовать любые мероприятия — от вечеринок до
          бизнес-конференций. Планируйте события, приглашайте участников,
          управляйте списком гостей и создавайте незабываемые моменты.
        </Text>
      </View>
      <View style={[styles.banner, styles.bannerMobile]}>
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
    zIndex: 1,
  },

  textBlockMobile: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  title: {
    fontWeight: "700",
    width: "100%",
    fontSize: 32,
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
