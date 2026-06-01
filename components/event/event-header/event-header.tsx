import { View, Text, StyleSheet } from "react-native";
import { EventHeaderItem } from "./event-header-item";
import { ContentOverlay, ControlButtons } from "@/components";
import { useState, useEffect } from "react";

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
  const {
    id,
    title,
    organizerFirstName,
    organizerLastName,
    eventDate,
    eventTime,
  } = event;

  const [averageRating, setAverageRating] = useState<number | null>(null);

  const isPastEvent = hasEventPassed(eventDate);

  useEffect(() => {
    if (!isPastEvent) return;

    fakeRequest()
      .then(({ averageRating }) => setAverageRating(averageRating))
      .catch(() => setAverageRating(null));
  }, [isPastEvent]);

  const onEdit = (): void => {
    console.log("EDIT EVENT", id);
  };

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

      <EventHeaderItem>
        <Text style={styles.date}>{eventDate}</Text>

        <ContentOverlay>
          <Text style={styles.time}>{eventTime}</Text>
        </ContentOverlay>

        {accessRights && <ControlButtons onEdit={onEdit} onDelete={onDelete} />}
      </EventHeaderItem>
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
