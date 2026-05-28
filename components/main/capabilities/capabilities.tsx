import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Capability } from "./capability";
import { CAPABILITIES } from "./data";

export const Capabilities = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Ваш инструмент для создания идеальных мероприятий!
      </Text>

      <View style={styles.list}>
        {CAPABILITIES.map(({ id, title, description, icon, color }) => (
          <Capability
            key={id}
            title={title}
            description={description}
            icon={icon}
            color={color}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    width: "100%",
  },

  list: {
    width: "100%",
    alignItems: "center",
    gap: 15,
  },
});
