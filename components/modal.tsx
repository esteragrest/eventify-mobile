import { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ContentOverlay } from "./ui";

export interface ModalProps {
  isOpen: boolean;
  image?: string;
  title: string;
  text: string;
  children?: React.ReactNode;
}

export const Modal = ({ isOpen, image, title, text, children }: ModalProps) => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <View style={styles.overlayContainer}>
      <View style={styles.overlay} />

      <Animated.View
        style={[
          styles.modalContent,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <TouchableOpacity style={styles.closeButton}>
          <Image
            source={require("../public/img/cross.png")}
            style={styles.closeIcon}
          />
        </TouchableOpacity>

        <View style={styles.banner}>
            {/* //TODO: пересмотреть тут */}
          <Image source={{ uri: image }} style={styles.bannerImage} />
        </View>

        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>

          <ContentOverlay>
            <Text style={styles.text}>{text}</Text>
          </ContentOverlay>

          {children}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.7)",
    width: "100%",
    height: "100%",
  },
  modalContent: {
    width: "80%",
    height: "60%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    zIndex: 30,
  },
  banner: {
    width: "100%",
    height: "55%",
    backgroundColor: "#E8FF59",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bannerImage: {
    width: 300,
    height: 200,
    resizeMode: "contain",
    opacity: 0.9,
  },
  info: {
    padding: 20,
    alignItems: "center",
    gap: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 40,
  },
  closeIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});
