import AsyncStorage from "@react-native-async-storage/async-storage";
import { WeatherData } from "../types/weatherTypes";

export const HOME_WEATHER_KEY = "@homeWeather";

export const saveWeatherToCache = async (weather: WeatherData) => {
  try {
    await AsyncStorage.setItem(HOME_WEATHER_KEY, JSON.stringify(weather));
  } catch (e) {
    console.error(`Failed to save home weather to cache`, e);
  }
};

export const getWeatherFromCache = async (): Promise<WeatherData | null> => {
  try {
    const weatherString = await AsyncStorage.getItem(HOME_WEATHER_KEY);
    return weatherString ? JSON.parse(weatherString) : null;
  } catch (e) {
    console.error(`Failed to get home weather from cache`, e);
    return null;
  }
};
