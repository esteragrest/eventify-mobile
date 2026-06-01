import { Button, Loader } from "@/components";
import { StyleSheet, Text, View } from "react-native";
import { ParticipantItem } from "./participant-item";
import { Registration } from "@/store/types";
import { useState } from "react";

interface ListOfParticipantsProps {
  participants: Registration[];
  isLoading?: boolean;
}

export const ListOfParticipants = ({
  participants,
  isLoading = false,
}: ListOfParticipantsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loader />
      ) : participants.length === 0 ? (
        <Text style={styles.empty}>
          На это мероприятие ещё никто не зарегистрировался!
        </Text>
      ) : (
        <>
          <Button backgroundColor="#E8FF59" onPress={toggle}>
            {isOpen ? "Скрыть участников" : "Посмотреть участников"}
          </Button>

          {isOpen && (
            <View style={styles.list}>
              {participants.map((reg) => (
                <ParticipantItem key={reg.id} registration={reg} />
              ))}
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 20,
    flexDirection: "column",
    gap: 20,
  },

  empty: {
    fontSize: 16,
    fontWeight: "500",
  },

  list: {
    width: "100%",
    flexDirection: "column",
    gap: 15,
  },
});
