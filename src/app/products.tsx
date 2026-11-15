import { useProducts } from "@/context/ProductsContext";
import { router } from "expo-router";
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProductsScreen() {
  const { products } = useProducts();

  const navigationHandler = (item: any) => {
    router.push({
      pathname: "/product-details",
      params: { id: item.id },
    });
  };

  const addHandler = () => {
    router.push("/add-product");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products</Text>

      <FlatList
        style={styles.list}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigationHandler(item)}
          >
            {item.imageUrl ? (
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
            ) : (
              <View style={[styles.image, styles.noImage]}>
                <Text>No image</Text>
              </View>
            )}

            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price} $</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.btn} onPress={addHandler}>
        <Text style={styles.btnText}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  list: {
    width: "100%",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#e0e0e0",
    marginBottom: 10,
    borderRadius: 8,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  noImage: {
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    marginLeft: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    marginTop: 5,
  },
  btn: {
    width: "100%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
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
});
