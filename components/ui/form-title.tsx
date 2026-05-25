import { StyleSheet, Text, useWindowDimensions } from "react-native";

export interface TitleFormProps {
  children: string;
}

export const TitleForm = ({ children }: TitleFormProps) => {
  const { width } = useWindowDimensions();

  //TODO: скорее всего не надо это с размерами
  let fontSize = 28;

  if (width >= 1701) fontSize = 36;
  else if (width <= 1024 && width >= 768) fontSize = 22;
  else if (width <= 480) fontSize = 22;

  return <Text style={[styles.title, { fontSize }]}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontWeight: "600",
  },
});
