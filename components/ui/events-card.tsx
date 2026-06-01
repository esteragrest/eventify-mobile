import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "./button";
import { ContentOverlay } from "./content-overlay";

interface EventsCardProps {
  eventId: number;
  title: string;
  organizer: string;
  eventDate: string;
  description: string;
  photo: any;
}

export const EventsCard = ({
  eventId,
  title,
  organizer,
  eventDate,
  description,
  photo,
}: EventsCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Image source={{ uri: photo }} style={styles.image} />

        <Text style={styles.title}>{title}</Text>

        <ContentOverlay>
          <Text style={styles.date}>{eventDate}</Text>
        </ContentOverlay>

        <Text style={styles.organizer}>{organizer}</Text>

        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          backgroundColor="#E8FF59"
          onPress={() =>
            router.push({
              pathname: "/events/[id]",
              params: { id: String(eventId) },
            })
          }
        >
          <Text style={styles.linkText}>Подробнее...</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 12,
    gap: 5,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    flexDirection: "column",
  },

  info: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 5,
    width: "100%",
  },

  image: {
    width: "100%",
    height: 195,
    borderRadius: 6,
    resizeMode: "cover",
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },

  date: {
    fontSize: 14,
  },

  organizer: {
    fontSize: 14,
    color: "#444",
  },

  description: {
    fontSize: 14,
    color: "#333",
    maxHeight: 60,
    overflow: "hidden",
  },

  buttonWrapper: {
    marginTop: 5,
  },

  linkText: {
    color: "black",
    fontSize: 16,
  },
});
