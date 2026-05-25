import { FlatList, StyleSheet, useWindowDimensions, View } from "react-native";
import { EventsCard, EventsNotFound } from "./ui";

interface EventItem {
  id: number;
  title: string;
  organizerFirstName: string;
  organizerLastName?: string;
  eventDate: string;
  description: string;
  photo: any;
}

interface EventsListProps {
  events: EventItem[];
}

export const EventsList = ({ events }: EventsListProps) => {
  const { width } = useWindowDimensions();

  let numColumns = 1;

  if (width >= 1700) numColumns = 4;
  else if (width >= 1170) numColumns = 4;
  else if (width >= 1100) numColumns = 4;
  else if (width >= 900) numColumns = 3;
  else if (width >= 768) numColumns = 2;
  else if (width >= 625) numColumns = 2;
  else numColumns = 1;

  if (events.length === 0) {
    return <EventsNotFound />;
  }

  return (
    <FlatList
      data={events}
      key={numColumns}
      numColumns={numColumns}
      contentContainerStyle={styles.container}
      columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
      renderItem={({ item }) => (
        <View style={styles.cardWrapper}>
          <EventsCard
            eventId={item.id}
            title={item.title}
            organizer={`${item.organizerFirstName} ${item.organizerLastName || ""}`}
            eventDate={item.eventDate}
            description={item.description}
            photo={item.photo}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 40,
    justifyContent: "center",
    gap: 15,
  },
  row: {
    justifyContent: "center",
    gap: 15,
  },
  cardWrapper: {
    flex: 1,
    marginBottom: 15,
  },
});
