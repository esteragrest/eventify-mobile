import { EventItem } from "@/store/types";
import { StyleSheet, View } from "react-native";
import { EventsList } from "../events-list";

interface UserEventsProps {
  theseActiveEvents: boolean;
  activeEvents: EventItem[];
  archivedEvents: EventItem[];
}

export const UserEvents = ({
  theseActiveEvents,
  activeEvents,
  archivedEvents,
}: UserEventsProps) => {
  const eventsToShow = theseActiveEvents ? activeEvents : archivedEvents;

  return (
    <View style={styles.container}>
      <EventsList events={eventsToShow} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: "column",
    gap: 16,
  },
});
