import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

interface FormProps {
  children: ReactNode;
}

export const Form = ({ children }: FormProps) => {
  //TODO: отправка формы будет происходить по кнопке
  return <View style={styles.form}>{children}</View>;
};

const styles = StyleSheet.create({
  form: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
