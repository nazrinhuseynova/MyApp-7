import { useUsers } from "@/context/UsersContext";
import { router } from "expo-router";
import { useEffect } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// export default function HomeScreen() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>Home</Text>
//       <Button
//         title="Go to profile"
//         onPress={() => router.push("/profile")}
//       ></Button>
//     </View>
//   );
// }

export default function HomeScreen() {
  const { appUsers } = useUsers();

  useEffect(() => {
    console.log("USERS : ", appUsers);
  }, [appUsers]);

  const navigationHandler = (item: any) => {
    router.push({
      pathname: "/profile",
      params: { id: item.id },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>App Users</Text>

      <FlatList
        data={appUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.item,
              {
                backgroundColor: item.approved ? "springgreen" : "lightgray",
              },
            ]}
            onPress={() => navigationHandler(item)}
          >
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    padding: 15,
    backgroundColor: "#e0e0e0",
    marginBottom: 10,
    borderRadius: 8,
  },
});
