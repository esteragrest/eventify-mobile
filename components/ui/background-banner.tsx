import { Image, StyleSheet, View, useWindowDimensions } from "react-native";

interface BackgroundBannerProps {
  imgUrl: any;
}

export const BackgroundBanner = ({ imgUrl }: BackgroundBannerProps) => {
  const { width } = useWindowDimensions();

  if (width < 768) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={imgUrl} style={styles.image} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "35%", 
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
