import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "@/components";

interface RatingResponse {
  isRegistered: boolean;
  isRated: boolean;
}

interface RatingProps {
  eventId: number;
}

export const Rating = ({ eventId }: RatingProps) => {
  const [hovered, setHovered] = useState<number>(0);
  const [selected, setSelected] = useState<number>(0);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isRated, setIsRated] = useState<boolean>(false);

  useEffect(() => {
    const fakeFetch = async (): Promise<RatingResponse> => {
      console.log("CHECK RATING FOR EVENT:", eventId);
      return {
        isRegistered: true,
        isRated: false,
      };
    };

    fakeFetch()
      .then((data) => {
        setIsRegistered(data.isRegistered);
        setIsRated(data.isRated);
      })
      .catch(() => {
        setIsRegistered(false);
        setIsRated(false);
      });
  }, [eventId]);

  const handleClick = (rating: number) => {
    setSelected(rating);
  };

  const sendRating = () => {
    console.log("SEND RATING:", { eventId, rating: selected });
    setIsRated(true);
  };

  if (!isRegistered || isRated) {
    return null;
  }

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
              onPress={() => handleClick(star)}
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
        <Button backgroundColor="#E0C9FF" onPress={sendRating}>
          Оставить оценку
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 20,
    flexDirection: "column",
    gap: 10,
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
});
