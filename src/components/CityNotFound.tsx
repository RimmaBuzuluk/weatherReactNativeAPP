import { View, Text, StyleSheet } from "react-native";

export const CityNotFound = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>City not found</Text>
      <Text style={styles.subtitle}>
        Ми не змогли знайти це місто.{"\n"}
        Перевірте назву та спробуйте ще раз.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    marginTop: 40,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 24,
    resizeMode: "contain",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "white",
    marginBottom: 12,
    fontFamily: "Montserrat_400Regular",
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    opacity: 0.8,
    marginBottom: 24,
    fontFamily: "Montserrat_400Regular",
  },
});
