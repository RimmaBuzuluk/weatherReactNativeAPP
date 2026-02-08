import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { CitySearchInput } from "../CitySearchInput";
import { useWeatherStore } from "../../store /weatherStore";
import { usePathname } from "expo-router";
import { weatherIcons } from "../../constants/weatherThemes";
import { CityNotFound } from "../CityNotFound";

type Props = {
  city?: string;
  temp?: number;
  condition?: string;
  feelsLike?: number;
  humidity?: number;
  error?: string;
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const ICON_SIZE = Math.min(200, SCREEN_HEIGHT * 0.25);
const TEMP_FONT_SIZE = Math.min(56, SCREEN_HEIGHT * 0.1);
const CITY_FONT_SIZE = Math.min(28, SCREEN_HEIGHT * 0.03);
const LABEL_FONT_SIZE = Math.min(16, SCREEN_HEIGHT * 0.03);
const VALUE_FONT_SIZE = Math.min(16, SCREEN_HEIGHT * 0.03);
const ROW_GAP = Math.min(12, SCREEN_HEIGHT * 0.02);
const INFO_BLOCK_PADDING = Math.min(16, SCREEN_HEIGHT * 0.025);
const EMPTY_IMAGE_SIZE = Math.min(180, SCREEN_HEIGHT * 0.5);

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
                {new Date().toLocaleDateString("en-US", { weekday: "short" })}
              </Text>
            </View>

            <Image source={theme.icon} style={styles.icon} />
            <View style={styles.infoBlock}>
              <InfoRow
                label="Temperature"
                value={`${Math.round(temp!)}°`}
                color={textColor}
              />
              <InfoRow
                label="Feels like"
                value={`${Math.round(feelsLike!)}°`}
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
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    minHeight: SCREEN_HEIGHT,
  },
  containerWrapper: {
    width: "100%",
    maxWidth: 1200,
    alignItems: "center",
  },
  cityName: {
    fontSize: CITY_FONT_SIZE,
    fontWeight: "700",
    color: "white",
    marginBottom: 16,
    textAlign: "center",
    paddingHorizontal: 8,
    fontFamily: "Montserrat_700Bold",
  },
  rowBlock: {
    flexDirection: "row",
    gap: ROW_GAP,
    marginBottom: 20,
    alignItems: "flex-end",
  },
  temp: {
    fontSize: TEMP_FONT_SIZE,
    fontWeight: "300",
    color: "white",
    fontFamily: "Montserrat_700Bold",
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginBottom: 24,
    resizeMode: "contain",
  },

  infoBlock: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: INFO_BLOCK_PADDING,
    marginBottom: 24,
    gap: ROW_GAP,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: LABEL_FONT_SIZE,
    color: "white",
    fontFamily: "Montserrat_400Regular",
  },
  value: {
    fontSize: VALUE_FONT_SIZE,
    color: "white",
    fontWeight: "600",
    fontFamily: "Montserrat_400Regular",
  },
  condition: {
    fontFamily: "Montserrat_400Regular",
  },
  day: {
    fontFamily: "Montserrat_400Regular",
  },
  emptyState: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyImage: {
    width: EMPTY_IMAGE_SIZE,
    height: EMPTY_IMAGE_SIZE,
    resizeMode: "contain",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: SCREEN_WIDTH * 0.06,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
    color: "#fff",
    fontFamily: "Montserrat_400Regular",
  },
  emptyText: {
    fontSize: SCREEN_WIDTH * 0.04,
    textAlign: "center",
    opacity: 0.8,
    lineHeight: SCREEN_WIDTH * 0.06,
    color: "#fff",
    fontFamily: "Montserrat_400Regular",
  },
});
