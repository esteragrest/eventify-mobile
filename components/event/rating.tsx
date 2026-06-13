import {
  useAddRatingMutation,
  useGetUserRatingQuery,
} from "@/store/api/ratingsApi";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface RatingProps {
  eventId: number;
  userId: number;
}

export const Rating = ({ eventId, userId }: RatingProps) => {
  const { data: userRating } = useGetUserRatingQuery(eventId);
  const [addRating] = useAddRatingMutation();

  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);

  if (userRating?.isRated) {
    return (
      <Text style={styles.alreadyRated}>
        Вы уже оставили оценку: {userRating.rating} ★
      </Text>
    );
  }

  const sendRating = async () => {
    if (!selected) return;

    await addRating({
      eventId,
      userId,
      rating: selected,
    });

    setSelected(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Пожалуйста, оцените мероприятие:</Text>

      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isActive = star <= (hovered || selected);

          return (
            <TouchableOpacity
              key={star}
              activeOpacity={0.7}
              onPress={() => setSelected(star)}
              onPressIn={() => setHovered(star)}
              onPressOut={() => setHovered(0)}
            >
              <Text style={[styles.star, isActive && styles.activeStar]}>
                ★
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {selected > 0 && (
        <TouchableOpacity style={styles.button} onPress={sendRating}>
          <Text style={styles.buttonText}>Оставить оценку</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },

  starsRow: {
    flexDirection: "row",
    gap: 10,
  },

  star: {
    fontSize: 48,
    color: "#ccc",
  },

  activeStar: {
    color: "#FFD700",
  },
  button: {
    backgroundColor: "#E0C9FF",
    padding: 10,
    alignSelf: "flex-start",
  },
  buttonText: { 
    fontWeight: "600"
  },
  alreadyRated: { 
    fontSize: 16, 
    fontWeight: "500"
  },
});
