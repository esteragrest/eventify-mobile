import { hasEventPassed } from "@/app/events/utils";
import {
  ContentOverlay,
  ControlButtons,
  Modal,
  DeleteButtons,
} from "@/components";
import { useDeleteEventMutation } from "@/store/api";
import { setEvent } from "@/store/slices";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { EventHeaderItem } from "./event-header-item";

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
  const [deleteEvent] = useDeleteEventMutation();

  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const isPastEvent = hasEventPassed(eventDate);

  useEffect(() => {
    if (!isPastEvent) return;

    fakeRequest()
      .then(({ averageRating }) => setAverageRating(averageRating))
      .catch(() => setAverageRating(null));
  }, [isPastEvent]);

  const handleDeleteEvent = async () => {
    try {
      await deleteEvent(id).unwrap();
      setModalOpen(false);
      router.replace("/events");
    } catch (err) {
      console.log("Ошибка удаления:", err);
    }
  };

  const onDelete = () => {
    setModalOpen(true);
  };

  const onChancel = () => {
    setModalOpen(false);
  }

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

      <Modal
        isOpen={modalOpen}
        image={require("../../../assets/img/delete.png")}
        title="Удалить мероприятие?"
        text="После удаления мероприятие исчезнет из списка и станет недоступным."
        bannerColor="#C0A2E2"
        onClose={onChancel}
      >
        <DeleteButtons onDelete={handleDeleteEvent} onChancel={onChancel} />
      </Modal>
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
