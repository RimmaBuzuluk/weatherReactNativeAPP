import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  onRetry?: () => void;
}

export const NoInternet = ({ onRetry }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>No Internet Connection</Text>

      <Text style={styles.subtitle}>
        It looks like you’re offline.{"\n"}
        Please check your connection and try again.
      </Text>

      {onRetry && (
        <TouchableOpacity style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#3A86FF",
    height: "100%",
  },
  title: {
    marginTop: 40,
    fontFamily: "Montserrat_400Regular",
    fontSize: 26,
    fontWeight: "700",
    color: "white",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    opacity: 0.8,
    marginBottom: 24,
    fontFamily: "Montserrat_400Regular",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    backgroundColor: "white",
    borderRadius: 10,
  },
  buttonText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
  },
});
