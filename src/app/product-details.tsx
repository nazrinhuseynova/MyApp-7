import { useProducts } from "@/context/ProductsContext";
import { router, useLocalSearchParams } from "expo-router";
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

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { products, updateProduct } = useProducts();

  const product = products.find((p) => p.id === id);

  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [description, setDescription] = useState(product?.description ?? "");

  const saveHandler = () => {
    const numericPrice = Number(price.replace(",", "."));

    if (!product || !name.trim() || isNaN(numericPrice)) {
      return;
    }

    updateProduct(product.id, name.trim(), numericPrice, description.trim());

    router.back();
  };

  if (!product) {
    return (
      <View style={styles.notFound}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.header}>Edit Product</Text>

        {product.imageUrl ? (
          <Image source={{ uri: product.imageUrl }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.noImage]}>
            <Text>No image</Text>
          </View>
        )}

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

        <TouchableOpacity style={styles.btn} onPress={saveHandler}>
          <Text style={styles.btnText}>Save</Text>
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
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
