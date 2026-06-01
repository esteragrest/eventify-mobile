import { Image, StyleSheet, View } from "react-native";
import { EventOptions } from "./event-options";

interface EventContentProps {
  event: {
    title: string;
    description: string;
    type: string;
    payment: string;
    address: string;
    ageLimit: string;
    maxParticipants?: number | null;
    photo: any;
  };
}

export const EventContent = ({ event }: EventContentProps) => {
  const {
    description,
    type,
    payment,
    address,
    ageLimit,
    maxParticipants,
    photo,
  } = event;

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.image} />

      <EventOptions
        options={[
          { optionName: "Описание мероприятия:", description },
          {
            optionName: "Тип мероприятия:",
            description: type === "open" ? "Открытое" : "Закрытое",
          },
          {
            optionName: "Тип оплаты:",
            description: payment === "free" ? "Бесплатное" : "Платное",
          },
          { optionName: "Адрес:", description: address },
          {
            optionName: "Возрастное ограничение:",
            description: ageLimit === "no_limit" ? "Без ограничения" : ageLimit,
          },
          {
            optionName: "Количество участников:",
            description: maxParticipants || "Без ограничения",
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    gap: 15,
  },

  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    resizeMode: "cover",
  },
});
