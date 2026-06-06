import {
  Image,
  ImageProps,
  Modal as RNModal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ContentOverlay } from "./ui";

// export const Modal = ({ isOpen, image, title, text, children }: ModalProps) => {
//   const scaleAnim = useRef(new Animated.Value(0.8)).current;
//   const opacityAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     if (isOpen) {
//       Animated.parallel([
//         Animated.timing(scaleAnim, {
//           toValue: 1,
//           duration: 300,
//           useNativeDriver: true,
//         }),
//         Animated.timing(opacityAnim, {
//           toValue: 1,
//           duration: 300,
//           useNativeDriver: true,
//         }),
//       ]).start();
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <View style={styles.overlayContainer}>
//       <View style={styles.overlay} />

//       <Animated.View
//         style={[
//           styles.modalContent,
//           {
//             opacity: opacityAnim,
//             transform: [{ scale: scaleAnim }],
//           },
//         ]}
//       >
//         <TouchableOpacity style={styles.closeButton}>
//           <Image
//             source={require("../public/img/cross.png")}
//             style={styles.closeIcon}
//           />
//         </TouchableOpacity>

//         <View style={styles.banner}>
//           {/* //TODO: пересмотреть тут */}
//           <Image source={{ uri: image }} style={styles.bannerImage} />
//         </View>

//         <View style={styles.info}>
//           <Text style={styles.title}>{title}</Text>

//           <ContentOverlay>
//             <Text style={styles.text}>{text}</Text>
//           </ContentOverlay>

//           {children}
//         </View>
//       </Animated.View>
//     </View>
//   );
// };

export interface ModalProps {
  isOpen: boolean;
  image?: ImageProps;
  title: string;
  text: string;
  children?: React.ReactNode;
  bannerColor?: string;
  onClose?: () => void;
}

export const Modal = ({
  isOpen,
  image,
  title,
  text,
  children,
  bannerColor,
  onClose,
}: ModalProps) => {
  return (
    <RNModal visible={isOpen} transparent animationType="fade">
      <View style={styles.overlayContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Image
              source={require("../public/img/cross.png")}
              style={styles.closeIcon}
            />
          </TouchableOpacity>

          <View
            style={[
              styles.banner,
              { backgroundColor: bannerColor ?? "#E8FF59" },
            ]}
          >
            <Image source={image} style={styles.bannerImage} />
          </View>

          <View style={styles.info}>
            <Text style={styles.title}>{title}</Text>

            <ContentOverlay>
              <Text style={styles.text}>{text}</Text>
            </ContentOverlay>

            {children}
          </View>
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backgroundColor: "rgba(0,0,0,0.7)",
  },

  modalContent: {
    width: "90%",
    height: 500,
    backgroundColor: "#fff",
    overflow: "hidden",
    justifyContent: "flex-start",
  },

  banner: {
    width: "100%",
    height: "50%",
    backgroundColor: "#E8FF59",
    justifyContent: "center",
    alignItems: "center",
  },

  bannerImage: {
    width: "70%",
    height: "70%",
    resizeMode: "contain",
    marginTop: 75,
  },

  info: {
    padding: 20,
    alignItems: "center",
    gap: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    alignItems: "center",
    textAlign: "center",
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
