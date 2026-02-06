import { WeatherCard } from "../components/WeatherCard";
import { Text, View } from "react-native";
import { useWeatherStore } from "../store /weatherStore";

export default function SearchScreen() {
  const { searchWeather, loading, error, loadWeatherByCity } =
    useWeatherStore();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  return <WeatherCard {...searchWeather} />;
}
