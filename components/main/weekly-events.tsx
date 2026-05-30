import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { EventsList } from "../events-list";
import { Loader } from "../ui";
import { useGetWeeklyEventsQuery } from "@/store/api/eventsApi";

export const WeeklyEvents = () => {
  const { data: weeklyEvents, isLoading, isError } = useGetWeeklyEventsQuery();

  const { width } = useWindowDimensions();
  const isMobile = width <= 480;
  const isTablet = width <= 1024;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, isMobile && styles.titleMobile]}>
        В ближайшую неделю:
      </Text>

      <Text
        style={[
          styles.description,
          (isMobile || isTablet) && styles.descriptionNarrow,
        ]}
      >
        Мероприятия, которые пройдут в ближайшую неделю и Вы можете на них
        зарегистрироваться!
      </Text>

      {isLoading && <Loader />}

      {isError && <Text>Ошибка загрузки данных</Text>}

      {!isLoading && !isError && <EventsList events={weeklyEvents ?? []} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 40,
    alignItems: "center",
    gap: 10,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
  },

  titleMobile: {
    fontSize: 24,
  },

  description: {
    fontSize: 16,
    textAlign: "center",
    width: "90%",
  },

  descriptionNarrow: {
    fontSize: 14,
    width: "80%",
  },
});

