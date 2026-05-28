import { useEffect, useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
// import { useSelector, useDispatch } from "react-redux";
import { EventsList } from "../events-list";
import { Loader } from "../ui";
// import { selectIsLoading } from "../../../selectors";
// import { setIsLoading } from "../../../actions";

export const WeeklyEvents = () => {
  const [weeklyEvents, setWeeklyEvents] = useState<any[]>([]);
  //заменить на состояние/из хуков запросов
  const isLoading = false;
  //   const isLoading = useSelector(selectIsLoading);
  //   const dispatch = useDispatch();

  const { width } = useWindowDimensions();
  const isMobile = width <= 480;
  const isTablet = width <= 1024;

  useEffect(() => {
    // dispatch(setIsLoading(true));

    //запросы
    setTimeout(() => {
      setWeeklyEvents([]);
      //   dispatch(setIsLoading(false));
    }, 500);
  }, []);

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

      {isLoading ? <Loader /> : <EventsList events={weeklyEvents} />}
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
