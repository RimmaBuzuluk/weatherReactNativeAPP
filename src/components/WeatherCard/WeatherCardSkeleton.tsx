import { View, StyleSheet } from "react-native";

export const WeatherCardSkeleton = () => {
  return (
    <View style={styles.skeletonContainer}>
      <View style={styles.skeletonCity} />
      <View style={styles.skeletonTemp} />
      <View style={styles.skeletonRow}>
        <View style={styles.skeletonBox} />
        <View style={styles.skeletonBox} />
        <View style={styles.skeletonBox} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  skeletonCity: {
    width: 120,
    height: 24,
    backgroundColor: "#ccc",
    borderRadius: 4,
    marginBottom: 12,
  },
  skeletonTemp: {
    width: 80,
    height: 56,
    backgroundColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
  },
  skeletonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  skeletonBox: {
    width: 60,
    height: 20,
    backgroundColor: "#ccc",
    borderRadius: 4,
  },
});
