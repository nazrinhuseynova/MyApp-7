import { UsersProvider } from "@/context/UsersContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <UsersProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="profile" options={{ title: "Profile" }} />
        <Stack.Screen name="edit" options={{ title: "Edit User" }} />
      </Stack>
    </UsersProvider>
  );
}
