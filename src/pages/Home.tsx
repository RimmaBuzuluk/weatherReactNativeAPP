import { useWeatherStore } from "../store /weatherStore";
import { useEffect } from "react";
import { WeatherCard } from "../components/WeatherCard/WeatherCard";
import { WeatherCardSkeleton } from "../components/WeatherCard/WeatherCardSkeleton";

export default function HomeScreen() {
  const { homeWeather, loading, loadWeatherByLocation } = useWeatherStore();

  useEffect(() => {
    loadWeatherByLocation();
  }, []);

  if (loading) return <WeatherCardSkeleton />;
  if (!homeWeather) return null;

  return <WeatherCard {...homeWeather} />;
}
