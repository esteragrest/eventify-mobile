import { ContentOverlay } from "@/components";
import { Event } from "@/store/types";
import { Image, StyleSheet, Text, View } from "react-native";
import { EventOptions } from "./event-options";

interface EventContentProps {
  event: Event;
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
    eventDate,
    eventTime,
  } = event;

  return (
    <View style={styles.container}>
      {photo && <Image source={{ uri: photo }} style={styles.image} />}

      <View style={styles.dateTimeContainer}>
        <Text>{eventDate}</Text>

        <ContentOverlay>
          <Text>{eventTime}</Text>
        </ContentOverlay>
      </View>

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

  dateTimeContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 4,
    fontSize: 16,
  },
});
