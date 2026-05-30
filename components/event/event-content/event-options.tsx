import { StyleSheet, View } from "react-native";
import { OptionItem } from "../../ui";

interface EventOptionsProps {
  options: {
    optionName: string;
    description: string | number;
  }[];
}

export const EventOptions = ({ options }: EventOptionsProps) => {
  return (
    <View style={styles.container}>
      {options.map(({ optionName, description }, index) => (
        <OptionItem
          key={index}
          optionName={optionName}
          description={description}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    gap: 10,
  },
});
