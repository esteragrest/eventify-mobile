import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

interface FileInputProps {
  register: any;
  setValue: (name: string, value: any) => void;
  defaultImage?: string;
}

export const FileInput = ({
  register,
  setValue,
  defaultImage,
}: FileInputProps) => {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);

  useEffect(() => {
    if (defaultImage) {
      setPreview(defaultImage);
      setValue("photo", defaultImage);
    }
  }, [defaultImage, setValue]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPreview(uri);
      setValue("photo", uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
        <Image
          source={
            preview
              ? { uri: preview }
              : require("../../public/img/add-photo.svg")
          }
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  imageWrapper: {
    width: 248,
    height: 145,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: 248,
    height: 145,
    resizeMode: "cover",
  },
});
