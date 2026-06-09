import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DateTimeInputProps {
  type: "date" | "time";
  label: string;
  value?: string;
  onChange?: (value: Date) => void;
}

export const DateTimeInput = ({
  type,
  label,
  value,
  onChange,
}: DateTimeInputProps) => {
  const [open, setOpen] = useState(false);

  let parsedValue: Date | null = null;

  if (value && value.trim() !== "") {
    if (type === "date") {
      parsedValue = new Date(value);
    } else {
      const [hours, minutes] = value.split(":").map(Number);
      if (!isNaN(hours) && !isNaN(minutes)) {
        const d = new Date();
        d.setHours(hours);
        d.setMinutes(minutes);
        d.setSeconds(0);
        d.setMilliseconds(0);
        parsedValue = d;
      }
    }
  }

  const formatted = !parsedValue
    ? label
    : type === "date"
      ? parsedValue.toLocaleDateString()
      : parsedValue.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

  const handleChange = (_: any, selected?: Date) => {
    setOpen(false);
    if (selected) {
      onChange?.(selected);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.input} onPress={() => setOpen(true)}>
        <Text style={styles.inputText}>{formatted}</Text>
      </TouchableOpacity>

      {open && (
        <DateTimePicker
          value={parsedValue ?? new Date()}
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
    minWidth: 130,
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

