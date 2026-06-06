import { ContentOverlay, ControlButtons } from "@/components";
import { setEvent } from "@/store/slices";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { EventHeaderItem } from "./event-header-item";

const hasEventPassed = (date: string): boolean => false;

const fakeRequest = async (): Promise<{ averageRating: number }> => ({
  averageRating: 4.7,
});

export interface EventHeaderProps {
  event: {
    id: number;
    title: string;
    organizerFirstName: string;
    organizerLastName?: string;
    eventDate: string;
    eventTime: string;
  };
  accessRights: boolean;
}

export const EventHeader = ({ event, accessRights }: EventHeaderProps) => {
  const onEdit = () => {
    dispatch(setEvent(event));
    router.push(`/events/edit/${event.id}`);
  };

  const { id, title, organizerFirstName, organizerLastName, eventDate } = event;
  const dispatch = useDispatch();

  const [averageRating, setAverageRating] = useState<number | null>(null);

  const isPastEvent = hasEventPassed(eventDate);

  useEffect(() => {
    if (!isPastEvent) return;

    fakeRequest()
      .then(({ averageRating }) => setAverageRating(averageRating))
      .catch(() => setAverageRating(null));
  }, [isPastEvent]);

  const onDelete = (): void => {
    console.log("DELETE EVENT", id);
  };

  return (
    <View style={styles.container}>
      <EventHeaderItem>
        <Text style={styles.title}>{title}</Text>

        <ContentOverlay>
          <Text style={styles.organizerName}>
            {organizerFirstName} {organizerLastName || ""}
          </Text>
        </ContentOverlay>

        {isPastEvent && averageRating !== null && (
          <View style={styles.rating}>
            <Text style={styles.ratingValue}>{averageRating}</Text>
            <Text style={styles.star}>★</Text>
          </View>
        )}
      </EventHeaderItem>

      {accessRights && <ControlButtons onEdit={onEdit} onDelete={onDelete} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
  },

  organizerName: {
    fontSize: 14,
  },

  date: {
    fontSize: 16,
  },

  time: {
    fontSize: 16,
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  ratingValue: {
    fontSize: 18,
    fontWeight: "600",
  },

  star: {
    fontSize: 28,
    color: "#FFD700",
  },
});
