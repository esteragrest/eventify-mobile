import { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

export const Loader = () => {
  const dots = [
    useRef(new Animated.Value(0.3)).current,
    useRef(new Animated.Value(0.3)).current,
    useRef(new Animated.Value(0.3)).current,
    useRef(new Animated.Value(0.3)).current,
  ];

  //TODO: пересмотреть этот лоадер
  useEffect(() => {
    const animations = dots.map((dot, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1,
            duration: 300,
            delay: index * 150,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.3,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ),
    );

    animations.forEach((anim) => anim.start());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.loaderRow}>
        {dots.map((dot, i) => (
          <Animated.View
            key={i}
            style={[styles.dot, { opacity: dot, transform: [{ scale: dot }] }]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loaderRow: {
    flexDirection: "row",
    gap: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#c0a2e2",
  },
});
