import { View, Text, StyleSheet, Image } from "react-native";
import { CitySearchInput } from "../CitySearchInput";
import { usePathname } from "expo-router";
import { weatherIcons } from "../../constants/weatherThemes";
import { CityNotFound } from "../CityNotFound";
import { useWeatherStore } from "../../store /weatherStore";

type Props = {
  city?: string;
  temp?: number;
  condition?: string;
  feelsLike?: number;
  humidity?: number;
  error?: string;
};

export const WeatherCard = ({
  city,
  temp,
  condition,
  feelsLike,
  humidity,
  error,
}: Props) => {
  const theme = condition
    ? (weatherIcons[condition] ?? weatherIcons["Snow"])
    : weatherIcons["Snow"];

  const { loadWeatherByCity } = useWeatherStore();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const textColor = theme.textColor;

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.containerWrapper}>
        {!isHome && (
          <>
            <CitySearchInput onSearch={loadWeatherByCity} />
            {error && <CityNotFound />}
          </>
        )}

        {!isHome && !city && !error && (
          <View style={styles.emptyState}>
            <Image
              source={require("../../assets/meteorology.png")}
              style={styles.emptyImage}
            />
            <Text style={styles.emptyTitle}>
              🌍 Знайдіть погоду в будь-якому місті світу
            </Text>
            <Text style={styles.emptyText}>
              Введіть назву міста у поле пошуку вище, щоб переглянути актуальну
              температуру, погодні умови та вологість.
            </Text>
          </View>
        )}

        {city && condition && feelsLike && humidity && temp && !error && (
          <>
            <Text style={[styles.cityName, { color: textColor }]}>{city}</Text>

            <View style={styles.rowBlock}>
              <Text style={[styles.temp, { color: textColor }]}>
                {Math.round(temp)}°
              </Text>
              <Text style={[styles.condition, { color: textColor }]}>
                {condition}
              </Text>
              <Text style={[styles.day, { color: textColor }]}>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </Text>
            </View>

            <Image source={theme.icon} style={styles.icon} />

            <View style={styles.infoBlock}>
              <InfoRow
                label="Temperature"
                value={`${Math.round(temp)}°`}
                color={textColor}
              />
              <InfoRow
                label="Feels like"
                value={`${Math.round(feelsLike)}°`}
                color={textColor}
              />
              <InfoRow
                label="Humidity"
                value={`${humidity}%`}
                color={textColor}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const InfoRow = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) => (
  <View style={styles.infoRow}>
    <Text style={[styles.label, { color }]}>{label}:</Text>
    <Text style={[styles.value, { color }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  containerWrapper: {
    width: "100%",
    maxWidth: 500,
    alignItems: "center",
  },
  cityName: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
  },
  rowBlock: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
    alignItems: "flex-end",
  },
  temp: {
    fontSize: 56,
    fontWeight: "700",
    fontFamily: "Montserrat_700Bold",
  },
  condition: {
    fontSize: 18,
    fontFamily: "Montserrat_400Regular",
  },
  day: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
  },
  icon: {
    width: 180,
    height: 180,
    marginBottom: 24,
    resizeMode: "contain",
  },
  infoBlock: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Montserrat_400Regular",
  },
  emptyState: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyImage: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
    color: "#fff",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.8,
    color: "#fff",
  },
});
