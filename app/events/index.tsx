import { EventsList, Pagination, Loader } from "@/components";
import { useGetEventsQuery } from "@/store/api";
import { ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react";

export default function EventsScreen() {
  const [page, setPage] = useState(1);

  const limit = 6;

  const { data, isLoading, isError } = useGetEventsQuery({
    page,
    limit,
    title: "",
  });

  const events = data?.events ?? [];
  const lastPage = data?.lastPage ?? 1;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {isLoading && <Loader />}

      {!isLoading && !isError && (
        <View style={styles.listWrapper}>
          <EventsList events={events} />
        </View>
      )}

      {!isLoading && lastPage > 1 && events.length > 0 && (
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

