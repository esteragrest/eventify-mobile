import { Controller } from "react-hook-form";
import { StyleSheet, TextInput, View, TextInputProps } from "react-native";

interface InputProps {
  name: string;
  control: any;
  placeholder?: string;
  secureTextEntry?: boolean;
  width?: number | `${number}%` | "auto";
  keyboardType?: TextInputProps["keyboardType"];
}

export const Input = ({
  name,
  control,
  width = "100%",
  ...props
}: InputProps) => {
  return (
    <View style={[styles.wrapper, { width }]}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholderTextColor="#777"
            {...props}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "rgb(192, 162, 226)",
    paddingHorizontal: 10,
    fontSize: 12,
    backgroundColor: "#FFFFFF",
  },
});
