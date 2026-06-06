import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DateTimeInputProps {
  type: "date" | "time";
  label: string;
  onChange?: (value: Date) => void;
}

export const DateTimeInput = ({
  type,
  label,
  onChange,
}: DateTimeInputProps) => {
  const [value, setValue] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);

  const handleChange = (_: any, selected?: Date) => {
    setOpen(false);
    if (selected) {
      setValue(selected);
      onChange?.(selected);
    }
  };

  const formatted =
    value === null
      ? label
      : type === "date"
        ? value.toLocaleDateString()
        : value.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>{label}</Text> */}

      <TouchableOpacity style={styles.input} onPress={() => setOpen(true)}>
        <Text
          style={[
            styles.inputText,
          ]}
        >
          {formatted}
        </Text>
      </TouchableOpacity>

      {open && (
        <DateTimePicker
          value={value ?? new Date()}
          mode={type}
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E8FF59",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    minWidth: 150,
  },
  label: {
    fontSize: 14,
    color: "black",
  },
  input: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  inputText: {
    fontSize: 14,
    color: "black",
  },
});
