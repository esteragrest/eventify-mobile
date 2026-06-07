import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";

import { ControlButtons } from "../control-buttons";
import { Modal } from "../modal";
import { Button, DeleteButtons } from "../ui";

import { useRemoveUserMutation } from "@/store/api";
import { logout } from "@/store/slices";

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
      {/* Аватар + кнопки под ним */}
      <View style={styles.leftColumn}>
        <Image
          source={
            photo ? { uri: photo } : require("@/assets/img/no-photo-1.jpg")
          }
          style={styles.avatar}
        />

        {accessRights && (
          <View style={styles.controls}>
            <ControlButtons
              onEdit={() =>
                router.push({
                  pathname: `/profile/edit/${id}`,
                })
              }
              onDelete={() => setModalOpen(true)}
            />
          </View>
        )}
      </View>

      {/* Информация о пользователе */}
      <View style={styles.infoBlock}>
        <Text style={styles.name}>
          {firstName} {lastName || ""}
        </Text>

        <Text style={styles.text}>{email}</Text>
        {phone && <Text style={styles.text}>{phone}</Text>}
        {birthDate && <Text style={styles.text}>{birthDate}</Text>}

        <View style={styles.stats}>
          <Text style={styles.text}>Мероприятия: {countUserEvents}</Text>
          <Text style={styles.text}>Посещения: {countOfEventsAttended}</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <Button backgroundColor="#C0A2E2" onPress={handleActiveEvents}>
            {theseActiveEvents ? "Актуальные мероприятия" : "Архив мероприятий"}
          </Button>
        </View>
      </View>

      {/* Модалка удаления */}
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
    paddingBottom: 25,
    flexDirection: "row",
    gap: 20,
  },

  leftColumn: {
    alignItems: "center",
    gap: 10,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 55,
  },

  controls: {
    marginTop: 5,
  },

  infoBlock: {
    flex: 1,
    flexDirection: "column",
    gap: 4,
  },

  name: {
    fontSize: 18,
    fontWeight: "600",
  },

  text: {
    fontSize: 12,
  },

  stats: {
    flexDirection: "row",
    gap: 20,
    marginTop: 6,
  },

  buttonWrapper: {
    marginTop: 12,
  },
});
