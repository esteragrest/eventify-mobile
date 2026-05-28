import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

export interface CapabilityProps {
  title: string;
  description: string;
  icon: any;
  color: string;
}

export const Capability = ({
  title,
  description,
  icon,
  color,
}: CapabilityProps) => {
  const { width } = useWindowDimensions();

  const isMobile = width <= 480;
  const isTablet = width <= 1024;

  let titleSize = 20;
  if (isTablet) titleSize = 18;
  if (isMobile) titleSize = 18;

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={styles.titleRow}>
        <Image source={icon} style={styles.icon} />
        <Text style={[styles.title, { fontSize: titleSize }]}>{title}</Text>
      </View>

      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 272,
    paddingVertical: 20,
    paddingHorizontal: 18,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 7,
    textAlign: "center",
    minHeight: 235,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  icon: {
    width: 41,
    height: 41,
    resizeMode: "contain",
  },

  title: {
    width: "100%",
    fontWeight: "700",
    flexShrink: 1,
    flexWrap: "wrap",
  },

  description: {
    fontSize: 14,
    lineHeight: 18,
  },
});
