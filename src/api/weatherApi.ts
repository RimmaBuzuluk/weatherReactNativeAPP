import { WeatherData } from "../types/weatherTypes";

const API_KEY = "909586c7f7e99b702312d2dd137f97f3";

export const fetchWeatherByCoords = async (
  lat: number,
  lon: number,
): Promise<WeatherData> => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch weather");
  }

  const data = await res.json();

  return {
    city: data.name,
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    condition: data.weather[0].main,
  };
};

export const fetchWeatherByCity = async (city: string) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
  );

  const data = await res.json();

  return {
    city: data.name,
    temp: data.main.temp,
    condition: data.weather[0].main,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
  };
};
