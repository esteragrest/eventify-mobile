import { Link } from "expo-router";
import{ useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { Button } from "./button";

export const EventsNotFound = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // fadeIn animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // floating animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -5,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  // pulse animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Animated.Image
        source={require("../..public/events-not-found.png")}
        style={[styles.image, { transform: [{ translateY: floatAnim }] }]}
      />

      <Text style={styles.title}>Пока здесь пусто...</Text>
      <Text style={styles.text}>
        Создайте новое мероприятие или загляните позже!
      </Text>

      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <Button backgroundColor="#E8FF59">
          <Link href="/event/create" style={styles.linkText}>
            Создать мероприятие
          </Link>
        </Button>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: "#444",
  },
  linkText: {
    color: "black",
    fontSize: 16,
  },
});
