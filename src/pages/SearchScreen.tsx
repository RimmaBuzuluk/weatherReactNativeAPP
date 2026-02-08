import { WeatherCard } from "../components/WeatherCard/WeatherCard";
import { useWeatherStore } from "../store /weatherStore";
import { WeatherCardSkeleton } from "../components/WeatherCard/WeatherCardSkeleton";
import { NoInternet } from "../components/NoInternet";

export default function SearchScreen() {
  const { searchWeather, loading, error } = useWeatherStore();

  if (loading) return <WeatherCardSkeleton />;

  if (error === "OFFLINE") return <NoInternet />;

  return (
    <WeatherCard
      {...(error === "CITY_NOT_FOUND" ? { error } : {})}
      {...searchWeather}
    />
  );
}
