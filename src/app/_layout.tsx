import { ProductsProvider } from "@/context/ProductsContext";
import { UsersProvider } from "@/context/UsersContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <UsersProvider>
      <ProductsProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen name="profile" options={{ title: "Profile" }} />
          <Stack.Screen name="edit" options={{ title: "Edit User" }} />
          <Stack.Screen name="products" options={{ title: "Products" }} />
          <Stack.Screen
            name="product-details"
            options={{ title: "Product Details" }}
          />
          <Stack.Screen name="add-product" options={{ title: "Add Product" }} />
        </Stack>
      </ProductsProvider>
    </UsersProvider>
  );
}
