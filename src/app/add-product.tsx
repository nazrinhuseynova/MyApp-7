import { useProducts } from "@/context/ProductsContext";
import { File, Paths } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddProductScreen() {
  const { addProduct } = useProducts();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const pickImageHandler = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (result.canceled) {
        return;
      }

      const sourceUri = result.assets[0].uri;
      const extension = sourceUri.split("?")[0].split(".").pop() ?? "jpg";

      // Şəkli telefonun öz fayl sisteminə (document directory) kopyalayırıq
      const source = new File(sourceUri);
      const destination = new File(
        Paths.document,
        `product_${Date.now()}.${extension}`,
      );

      await source.copy(destination);

      setImageUrl(destination.uri);
    } catch (error) {
      console.log("IMAGE ERROR : ", error);
    }
  };

  const addHandler = () => {
    const numericPrice = Number(price.replace(",", "."));

    if (!name.trim() || !price.trim() || isNaN(numericPrice)) {
      return;
    }

    addProduct(name.trim(), numericPrice, description.trim(), imageUrl);

    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.header}>Add Product</Text>

        <TouchableOpacity onPress={pickImageHandler}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} />
          ) : (
            <View style={[styles.image, styles.noImage]}>
              <Text>Pick image</Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter product name"
        />

        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Enter price"
          keyboardType="numeric"
        />

        <TextInput
          style={[styles.input, styles.multiline]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          multiline
        />

        <TouchableOpacity style={styles.btn} onPress={addHandler}>
          <Text style={styles.btnText}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginBottom: 20,
  },
  noImage: {
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    width: "100%",
    marginBottom: 20,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  btn: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: Platform.select({
      android: "springgreen",
      ios: "skyblue",
      default: "skyblue",
    }),
  },
  btnText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cancel: {
    fontSize: 18,
    color: "red",
    marginTop: 20,
  },
});
