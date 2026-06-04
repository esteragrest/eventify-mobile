import { StyleSheet, Text, View } from "react-native";

export interface OptionItemProps {
  optionName: string;
  description?: string | number;
}

export const OptionItem = ({ optionName, description }: OptionItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.optionName}>{optionName}</Text>
      {description !== undefined && (
        <Text style={styles.description}>{description}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 4
  },
  optionName: {
    opacity: 0.7,
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    flexWrap: "wrap",
    lineHeight: 18,
  },
});
