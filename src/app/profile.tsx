import { useUsers } from "@/context/UsersContext";
import { router, useLocalSearchParams } from "expo-router";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// export default function Profile() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Welcome to profile</Text>
//       <Button title="Go Back" onPress={() => router.back()} />
//     </View>
//   );
// }

export default function Profile() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { appUsers, handleApprove } = useUsers();

  const user = appUsers.find((u) => u.id === id);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>User not found</Text>
      </View>
    );
  }

  const editHandler = () => {
    router.push({
      pathname: "/edit",
      params: { id: user.id },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Name : {user.name}</Text>
      <Text style={styles.id}>ID : {user.id}</Text>

      <TouchableOpacity
        style={styles.btn}
        disabled={user.approved}
        onPress={() => {
          handleApprove(user.id);
          router.back();
        }}
      >
        <Text
          style={[
            styles.name,
            {
              backgroundColor: user.approved ? "springgreen" : "red",
            },
          ]}
        >
          Approve yourself
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={editHandler}>
        <Text style={[styles.btnText, { backgroundColor: "skyblue" }]}>
          Edit User
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    padding: 4,
  },
  id: {
    fontSize: 22,
    marginTop: 20,
  },
  btnText: {
    fontSize: 20,
    padding: 12,
    textAlign: "center",
  },
  btn: {
    fontSize: 22,
    borderRadius: 8,
  },
  back: {
    fontSize: 18,
    marginTop: 25,
    color: "blue",
  },
});
