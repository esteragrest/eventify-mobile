import { useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface SelectOption {
  id: number | string;
  title: string;
  value: string | number;
}

export interface SelectableMenuProps {
  title: string;
  options: SelectOption[];
  setValue: (value: string | number) => void;
  selectedValue?: string | number;
}

//TODO: проверить работу
export const SelectableMenu = ({
  title,
  options,
  setValue,
  selectedValue,
}: SelectableMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(title);

  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const selected = options.find((o) => o.value == selectedValue);
    setSelectedOption(selected ? selected.title : title);
  }, [selectedValue, options, title]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);

    Animated.timing(rotateAnim, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const selectOption = (option: SelectOption) => {
    setSelectedOption(option.title);
    setValue(option.value);
    setIsOpen(false);

    Animated.timing(rotateAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-180deg"],
  });

  return (
    <View style={styles.container}>
      {/* Кнопка */}
      <TouchableOpacity style={styles.selectButton} onPress={toggleMenu}>
        <Text style={styles.selectedText}>{selectedOption}</Text>

        {/* <Animated.View style={{ transform: [{ rotate }] }}>
          <Image
            source={require("../../../assets/select.png")}
            style={styles.icon}
          />
        </Animated.View> */}
      </TouchableOpacity>

      {/* Выпадающий список */}
      {isOpen && (
        <View style={styles.optionsContainer}>
          <ScrollView style={styles.options} nestedScrollEnabled>
            {options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionItem}
                onPress={() => selectOption(option)}
              >
                <Text>{option.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 200,
    paddingVertical: 10,
    position: "relative",
  },

  selectButton: {
    backgroundColor: "#E0C9FF",
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },

  selectedText: {
    fontSize: 16,
  },

  icon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },

  optionsContainer: {
    position: "absolute",
    top: 50,
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#C0A2E2",
    padding: 8,
    zIndex: 10,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  options: {
    maxHeight: 250,
  },

  optionItem: {
    height: 30,
    justifyContent: "center",
  },
});
