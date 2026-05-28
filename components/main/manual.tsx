import { ResizeMode, Video } from "expo-av";
import { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Manual = () => {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = async () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Как создать свое мероприятие:</Text>

      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={require("../../public/video/create-event.mp4")}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
        />

        <TouchableOpacity style={styles.button} onPress={togglePlay}>
          {isPlaying ? (
            <View style={styles.square} />
          ) : (
            <View style={styles.triangle} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },

  videoContainer: {
    width: "90%",
    position: "relative",
    alignItems: "center",
  },

  video: {
    width: "100%",
    height: 220,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
  },

  button: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
    width: 60,
    height: 60,
    backgroundColor: "#E8FF59",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderLeftColor: "#C0A2E2",
    borderTopWidth: 12,
    borderTopColor: "transparent",
    borderBottomWidth: 12,
    borderBottomColor: "transparent",
    marginLeft: 4,
  },

  square: {
    width: 20,
    height: 20,
    backgroundColor: "#C0A2E2",
  },
});
