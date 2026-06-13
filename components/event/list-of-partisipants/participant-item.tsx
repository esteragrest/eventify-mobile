import { ItemMainInfo, ListItemContainer } from "@/components";
import { Text } from "@react-navigation/elements";
import { StyleSheet, View } from "react-native";

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
          <Text style={styles.option}>{email}</Text>
          <Text style={styles.option}>{phone}</Text>
          {/* <OptionItem optionName="Телефон:" description={phone} /> */}
        </ItemMainInfo>

        <Text style={styles.option}>{participantsCount}</Text>
        {/* <OptionItem
          optionName="Количество участников:"
          description={participantsCount}
        /> */}
      </ListItemContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  option: {
    fontSize: 12,
    opacity: 0.7,
    color: "#000",
  },
});
