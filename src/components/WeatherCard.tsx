import { View, Text, StyleSheet, Image } from "react-native";
import { CitySearchInput } from "./CitySearchInput";
import { useWeatherStore } from "../store /weatherStore";
import { usePathname } from "expo-router";
import Svg, { Ellipse } from "react-native-svg";

type Props = {
  city?: string;
  temp?: number;
  condition?: string;
  feelsLike?: number;
  humidity?: number;
};

type WeatherTheme = {
  icon: any;
  backgroundColor: string;
};

export const weatherIcons: Record<string, WeatherTheme> = {
  Clear: {
    icon: require("../assets/images/sun.png"),
    backgroundColor: "#FFD93D", // яскраво-жовтий
  },
  Clouds: {
    icon: require("../assets/images/cloudy.png"),
    backgroundColor: "#9EC1CF", // світло-блакитний/сірий
  },
  Rain: {
    icon: require("../assets/images/rain.svg"),
    backgroundColor: "#4A90E2", // насичений синій
  },
  Drizzle: {
    icon: require("../assets/images/drizzle.svg"),
    backgroundColor: "#50C0E9", // світло-синій
  },
  Thunderstorm: {
    icon: require("../assets/images/thunderstorm.svg"),
    backgroundColor: "#FF6B6B", // червоно-рожевий для грози
  },
  Snow: {
    icon: require("../assets/images/snow.png"),
    backgroundColor: "#A8DADC", // ніжний блакитний
  },
  Mist: {
    icon: require("../assets/images/mist.svg"),
    backgroundColor: "#B0BEC5", // світло-сірий
  },
  Smoke: {
    icon: require("../assets/images/smoke.svg"),
    backgroundColor: "#90A4AE", // сірий з холодним відтінком
  },
  Haze: {
    icon: require("../assets/images/haze.svg"),
    backgroundColor: "#BDBDBD", // світло-сірий
  },
  Dust: {
    icon: require("../assets/images/dust.svg"),
    backgroundColor: "#D7CCC8", // бежево-сірий
  },
  Fog: {
    icon: require("../assets/images/foggy.svg"),
    backgroundColor: "#CFD8DC", // дуже світло-сірий
  },
  Sand: {
    icon: require("../assets/images/sand.svg"),
    backgroundColor: "#F4E1B9", // піщаний
  },
  Ash: {
    icon: require("../assets/images/ash.svg"),
    backgroundColor: "#90A4AE", // сірий
  },
  Squall: {
    icon: require("../assets/images/squall.svg"),
    backgroundColor: "#607D8B", // темно-сірий
  },
  Tornado: {
    icon: require("../assets/images/tornado.svg"),
    backgroundColor: "#37474F", // темно-сірий майже чорний
  },
};

export const WeatherCard = ({
  city,
  temp,
  condition,
  feelsLike,
  humidity,
}: Props) => {
  const theme = condition
    ? (weatherIcons[condition] ?? weatherIcons["Snow"])
    : weatherIcons["Snow"];
  const { loadWeatherByCity } = useWeatherStore();
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      {!isHome && <CitySearchInput onSearch={loadWeatherByCity} />}
      {city && condition && feelsLike && humidity && temp && (
        <>
          <Text style={styles.cityName}>{city}</Text>
          <View style={styles.rowBlock}>
            <Text style={styles.temp}>{Math.round(temp)}°</Text>
            <Text style={styles.condition}>{condition}</Text>
            <Text style={styles.day}>
              {new Date().toLocaleDateString("en-US", { weekday: "short" })}
            </Text>
          </View>

          <Image source={theme.icon} style={styles.icon} />
          <View style={styles.infoBlock}>
            <InfoRow label="Temperature" value={`${Math.round(temp)}°`} />
            <InfoRow label="Feels like" value={`${Math.round(feelsLike)}°`} />
            <InfoRow label="Humidity" value={`${humidity}%`} />
          </View>
        </>
      )}
    </View>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    minHeight: "100%",
    backgroundColor: "#76b4ffff",
  },
  cityName: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    marginBottom: 16,
    alignItems: "flex-start",
  },
  rowBlock: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
    alignItems: "flex-end",
  },
  temp: {
    fontSize: 56,
    fontWeight: "300",
    color: "white",
  },
  condition: {
    fontSize: 18,
    fontWeight: "200",

    color: "white",
  },
  day: {
    fontSize: 18,
    color: "white",
    fontWeight: "200",
  },
  icon: {
    width: 200,
    height: 200,
    marginBottom: 24,
    paddingBottom: 24,
    resizeMode: "contain",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  infoBlock: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    gap: 24,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    color: "white",
    fontSize: 16,
  },
  value: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
