import { getApiKey } from "../services/secureService";
import { WeatherData } from "../types/weatherTypes";

export class NetworkError extends Error {}
export class CityNotFoundError extends Error {}

export const fetchWeatherByCoords = async (
  lat: number,
  lon: number,
): Promise<WeatherData> => {
  const apiKey = await getApiKey();

  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
  }
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather");
  }

  const data = await response.json();

  return {
    city: data.name,
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    condition: data.weather[0].main,
  };
};

export const fetchWeatherByCity = async (city: string) => {
  const apiKey = await getApiKey();

  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
  );

  const data = await response.json();

  if (response.status === 404) {
    throw new CityNotFoundError("CITY_NOT_FOUND");
  }

  if (!response.ok) {
    throw new NetworkError("NETWORK_ERROR");
  }

  return {
    city: data.name,
    temp: data.main.temp,
    condition: data.weather[0].main,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
  };
};
