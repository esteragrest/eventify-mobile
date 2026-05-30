import { Button, Loader } from "@/components";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ParticipantItem } from "./participant-item";

interface Registration {
  id: number;
  registeredUserId: number;
  firstName: string;
  lastName?: string;
  photo?: any;
  email: string;
  phone: string;
  participantsCount: number;
}

export const ListOfParticipants = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingParticipants, setIsLoadingParticipants] = useState(true);

  useEffect(() => {
    setIsLoadingParticipants(true);

    setTimeout(() => {
      setRegistrations([
        {
          id: 1,
          registeredUserId: 10,
          firstName: "Анна",
          lastName: "Иванова",
          email: "anna@example.com",
          phone: "+79998887766",
          participantsCount: 2,
        },
        {
          id: 2,
          registeredUserId: 11,
          firstName: "Павел",
          lastName: "Сидоров",
          email: "pavel@example.com",
          phone: "+79995554433",
          participantsCount: 1,
        },
      ]);

      setIsLoadingParticipants(false);
    }, 800);
  }, []);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <View style={styles.container}>
      {isLoadingParticipants ? (
        <Loader />
      ) : registrations.length === 0 ? (
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
              {registrations.map((reg) => (
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
