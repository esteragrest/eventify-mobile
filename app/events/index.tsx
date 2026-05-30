import { EventsList, Pagination } from "@/components";
import { mockEvents } from "@/mock/events";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function EventsScreen() {
  const [page, setPage] = useState(1);

  const pageSize = 6;
  const lastPage = Math.ceil(mockEvents.length / pageSize);

  const paginatedEvents = mockEvents.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.listWrapper}>
        <EventsList events={paginatedEvents} />
      </View>

      {lastPage > 1 && (
        <Pagination page={page} lastPage={lastPage} setPage={setPage} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    gap: 30,
    backgroundColor: "#FCF7FF",
  },

  listWrapper: {
    width: "100%",
  },
});
