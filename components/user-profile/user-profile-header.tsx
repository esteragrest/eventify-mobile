import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";

import { ControlButtons } from "../control-buttons";
import { Modal } from "../modal";
import { Button, DeleteButtons } from "../ui";

import { useRemoveUserMutation } from "@/store/api";
import { logout } from "@/store/slices";
import { useState } from "react";

interface UserProfileHeaderProps {
  id: number;
  firstName: string;
  lastName?: string;
  birthDate?: string;
  email: string;
  phone?: string;
  photo?: string;
  countUserEvents: number;
  countOfEventsAttended: number;
  theseActiveEvents: boolean;
  handleActiveEvents: () => void;
  accessRights: boolean;
}

export const UserProfileHeader = ({
  id,
  firstName,
  lastName,
  birthDate,
  email,
  phone,
  photo,
  countUserEvents,
  countOfEventsAttended,
  theseActiveEvents,
  handleActiveEvents,
  accessRights,
}: UserProfileHeaderProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [deleteUser] = useRemoveUserMutation();
  const [modalOpen, setModalOpen] = useState(false);

  const onDeleteAccount = async () => {
    try {
      await deleteUser(id).unwrap();
      setModalOpen(false);

      dispatch(logout());
      router.replace("/auth/login");
    } catch (err) {
      console.log("Ошибка удаления аккаунта:", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Image
          source={
            photo ? { uri: photo } : require("@/assets/img/no-photo-1.jpg")
          }
          style={styles.avatar}
        />

        <View style={styles.userInfo}>
          <Text style={styles.name}>
            {lastName || ""} {firstName}
          </Text>

          {birthDate && <Text style={styles.text}>{birthDate}</Text>}
          <Text style={styles.text}>{email}</Text>
          {phone && <Text style={styles.text}>{phone}</Text>}

          <View style={styles.eventsInfo}>
            <Text style={styles.text}>Меропр.: {countUserEvents}</Text>
            <Text style={styles.text}>Посещения: {countOfEventsAttended}</Text>
          </View>
        </View>
      </View>

      <View style={styles.controlPanel}>
        <Button backgroundColor="#C0A2E2" onPress={handleActiveEvents}>
          {theseActiveEvents ? "Архив мероприятий" : "Активные мероприятия"}
        </Button>

        {accessRights && (
          <ControlButtons
            onEdit={() =>
              router.push({
                pathname: `/profile/edit/${id}`,
                params: {
                  id,
                  firstName,
                  lastName,
                  birthDate,
                  email,
                  phone,
                  photo,
                },
              })
            }
            onDelete={() => setModalOpen(true)}
          />
        )}
      </View>

      <Modal
        isOpen={modalOpen}
        image={require("@/assets/img/delete.png")}
        bannerColor="#C0A2E2"
        title="Удалить аккаунт?"
        text="После удаления все Ваши данные будут стерты."
        onClose={() => setModalOpen(false)}
      >
        <DeleteButtons
          onDelete={onDeleteAccount}
          onChancel={() => setModalOpen(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 20,
  },

  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexShrink: 1,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1.5,
    borderColor: "#000",
  },

  userInfo: {
    flexDirection: "column",
    gap: 4,
    flexShrink: 1,
  },

  name: {
    fontSize: 20,
    fontWeight: "600",
  },

  text: {
    fontSize: 14,
  },

  eventsInfo: {
    flexDirection: "row",
    gap: 20,
    marginTop: 6,
  },

  controlPanel: {
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 10,
  },
});
