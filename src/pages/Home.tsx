import { View, Text, Button, StyleSheet } from "react-native";
import { useWeatherStore } from "../store /weatherStore";
import { useEffect } from "react";
import { WeatherCard } from "../components/WeatherCard";

export default function HomeScreen() {
  const { homeWeather, loading, error, loadWeatherByLocation } =
    useWeatherStore();

  useEffect(() => {
    loadWeatherByLocation();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;
  if (!homeWeather) return null;

  return <WeatherCard {...homeWeather} />;
}
