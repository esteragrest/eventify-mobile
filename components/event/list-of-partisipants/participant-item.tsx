import { View, StyleSheet } from "react-native";
import { ListItemContainer, ItemMainInfo } from "@/components";
import { OptionItem } from "../../ui";

export interface ParticipantItemProps {
  registration: {
    registeredUserId: number;
    firstName: string;
    lastName?: string;
    photo?: any;
    email: string;
    phone: string;
    participantsCount: number;
  };
}

export const ParticipantItem = ({ registration }: ParticipantItemProps) => {
  const {
    registeredUserId,
    firstName,
    lastName,
    photo,
    email,
    phone,
    participantsCount,
  } = registration;

  return (
    <View style={styles.container}>
      <ListItemContainer>
        <ItemMainInfo
          itemName={`${firstName} ${lastName || ""}`}
          photo={photo}
          to={`/profile/${registeredUserId}`}
        >
          <View>
            <OptionItem optionName="Email:" description={email} />
          </View>
        </ItemMainInfo>

        <OptionItem optionName="Телефон:" description={phone} />
        <OptionItem
          optionName="Количество участников:"
          description={participantsCount}
        />
      </ListItemContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
