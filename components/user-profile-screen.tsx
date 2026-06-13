import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import {
  useGetUserProfileQuery,
  useGetUserRegistrationsQuery,
} from "@/store/api/usersApi";

import { ItemMainInfo, ListItemContainer, Loader } from "./ui";
import { UserEvents, UserProfileHeader } from "./user-profile";

import { EventItem } from "@/store/types";
import { checkAccessRights, isAuthorized } from "@/utils";

export function UserProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const currentUser = useSelector((state: any) => state.user.user);
  const currentUserId = currentUser?.id;
  const currentUserRole = currentUser?.roleId;

  const isOtherUser = !!params.userId;
  const profileId = isOtherUser ? Number(params.userId) : currentUserId;

  const isAuth = isAuthorized(currentUserRole);

  const { data, isLoading, error } = useGetUserProfileQuery(profileId, {
    skip: !profileId,
  });

  const { data: registrations } = useGetUserRegistrationsQuery(currentUserId!, {
    skip: isOtherUser || !currentUserId,
  });

  const [theseActiveEvents, setTheseActiveEvents] = useState(true);

  if (!isAuth && !isOtherUser) {
    router.replace("/auth/login");
    return null;
  }

  if (isLoading) return <Loader />;

  if (error || !data) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Ошибка загрузки профиля</Text>
      </View>
    );
  }

  const accessRights = checkAccessRights(
    data.user.id,
    currentUserId,
    currentUserRole,
  );

  const userProfile = {
    ...data.user,
    countUserEvents: data.countUserEvents,
    countOfEventsAttended: data.countOfEventsAttended,
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <UserProfileHeader
        {...userProfile}
        theseActiveEvents={theseActiveEvents}
        handleActiveEvents={() => setTheseActiveEvents(!theseActiveEvents)}
        accessRights={accessRights}
      />

      <UserEvents
        theseActiveEvents={theseActiveEvents}
        activeEvents={data.activeEvents}
        archivedEvents={data.archivedEvents}
      />

      {accessRights && registrations && registrations.length > 0 && (
        <View style={styles.registrationsContainer}>
          <Text style={styles.sectionTitle}>Регистрации:</Text>

          {/* //TODO: Добавить удаление регистраций */}
          {registrations.map((event: EventItem) => (
            <ListItemContainer key={event.id}>
              <ItemMainInfo
                itemName={event.title}
                photo={event.photo}
                to={`/events/${event.id}`}
              >
                {event.eventDate}
              </ItemMainInfo>
            </ListItemContainer>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FCF7FF",
  },

  registrationsContainer: {
    gap: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  errorText: {
    fontSize: 18,
    color: "red",
  },

  eventRegistrationDate: {
    fontSize: 12,
    color: "#000",
  },
});
