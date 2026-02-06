import { View, Text, Button, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>404</Text>
      <Text style={styles.text}>Page not found</Text>

      <Button title="Go home" onPress={() => router.replace("/")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "700",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});
