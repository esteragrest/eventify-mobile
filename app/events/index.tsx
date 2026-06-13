import { EventsFilters, EventsList, Loader, Pagination } from "@/components";
import { useGetEventsQuery } from "@/store/api";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

export interface EventsFiltersState {
  dateFrom: string;
  dateTo: string;
  payment: "" | "free" | "paid";
  address: string;
}

const LIMIT = 6;

export default function EventsScreen() {
  const [page, setPage] = useState(1);

  const searchPhrase = useSelector((state: any) => state.search.phrase);

  const [filters, setFilters] = useState<EventsFiltersState>({
    dateFrom: "",
    dateTo: "",
    payment: "",
    address: "",
  });

  const { data, isLoading, isError } = useGetEventsQuery({
    page,
    limit: LIMIT,
    title: searchPhrase,
    ...filters,
  });

  const events = data?.events ?? [];
  const lastPage = data?.lastPage ?? 1;

  const resetFilters = () => {
    setFilters({
      dateFrom: "",
      dateTo: "",
      payment: "",
      address: "",
    });
    setPage(1);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <EventsFilters
        filters={filters}
        setFilters={setFilters}
        onReset={resetFilters}
      />

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
    gap: 12,
    backgroundColor: "#FCF7FF",
  },

  listWrapper: {
    width: "100%",
  },
});
